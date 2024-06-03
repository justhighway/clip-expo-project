import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAccessToken, getProfile, postSignIn, postSignUp } from "@/api/auth";
import { removeSecureStore, setSecureStore } from "@/utils/secureStore";
import { removeHeader, setHeader } from "@/utils/header";
import queryClient from "@/api/queryClient";
import { numbers } from "@/constants/numbers";
import { queryKeys, storeKeys } from "@/constants/keys";

// SignUp Hook
function useSignUp(mutationOptions) {
  return useMutation({
    mutationFn: postSignUp,
    ...mutationOptions, //onSuccess, onSettled,...
  });
}

// SignIn Hook
function useSignIn(mutationOptions) {
  return useMutation({
    mutationFn: postSignIn,
    // accessToken은 Header에, refreshToken은 SecureStore에 저장
    onSuccess: ({ accessToken, refreshToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      setSecureStore("refreshToken", refreshToken);
    },
    onSettled: () => {
      // 로그인 후에 useGetRefreshToken 훅을 한 번 호출
      // 처음 로그인 했을 때에도 자동 갱신 옵션에 따라 로직이 돌도록 해줌
      // refetch할 query key(useGetRefreshToken에서 설정한)를 설정해주면 됨
      queryClient.refetchQueries({
        queryKey: ["auth", "getAccessToken"],
      });
      // 로그인 뒤에는 남아 있는 프로필 데이터도 변경해야 할 수 있음
      // query를 stale data로 만들기 위해
      // useGetProfile 훅을 한 번 무효화 함
      queryClient.invalidateQueries({
        queryKey: ["auth", "getProfile"],
      });
    },
    ...mutationOptions,
  });
}

// refreshToken으로 accessToken을 갱신하는 Hook
// TODO 사용자 고유 refreshToken이 저장되는 곳이 있어야 할듯
function useGetRefreshToken() {
  // useQuery의 반환 상태 값으로 핸들링
  const { isSuccess, data, isError } = useQuery({
    // useQuery는 query key를 설정해야함
    queryKey: ["auth", "getAccessToken"],
    queryFn: getAccessToken,
    // 신선하지 않은 데이터로 취급되는 시간
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3, // 27분
    // 시간 주기에 따라 refetch 하는 옵션
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    // 재연결 및 백그라운드에서도 refetch 될 수 있도록 하는 옵션
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    // 성공 시 Header, Secure Store 설정
    if (isSuccess) {
      setHeader("Authorization", `Bearer ${data.accessToken}`);
      setEncryptedStorage("refreshToken", data.refreshToken);
    }
    // 에러 시 Header, Secure Store 삭제
    if (isError) {
      removeHeader("Authorization");
      removeEncryptedStorage("refreshToken");
    }
  }, [isSuccess, isError]);

  return { isSuccess, isError };
}

function useGetProfile(queryOptions) {
  return useQuery({
    queryKey: ["auth", "getProfile"],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useAuth() {
  const signUpMutation = useSignUp();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    // true일 때 쿼리가 실행될 수 있도록 해주는 옵션
    // refreshTokenQuery이 성공했다면 getProfileQuery도 해주는 것
    enabled: refreshTokenQuery.isSuccess,
  });
  // getProfileQuery가 성공했다면 로그인이 됐다고 볼 수 있는 것
  const isSignIn = getProfileQuery.isSuccess;
  const signInMutation = useSignIn();

  return {
    refreshTokenQuery,
    getProfileQuery,
    isSignIn,
    signInMutation,
    signUpMutation,
  };
}

export default useAuth;
