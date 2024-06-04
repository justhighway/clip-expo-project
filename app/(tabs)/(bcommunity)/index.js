import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  ScrollView,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  BackHandler,
} from "react-native"; // BackHandler 추가
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const [editingPost, setEditingPost] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isGuideModalVisible, setGuideModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const postsRef = useRef([]);

  useEffect(() => {
    postsRef.current = posts;
  }, [posts]);

  const addPost = () => {
    if (newCategory && newTitle && newContent) {
      const newPost = {
        id: Date.now(),
        category: newCategory,
        title: newTitle,
        content: newContent,
        image: image,
      };
      setPosts([...posts, newPost]);
      setNewCategory("");
      setNewTitle("");
      setNewContent("");

      setImage(null);
      setModalVisible(false);
    }
  };

  const editPost = (post) => {
    setEditingPost(post);
    setNewCategory(post.category);
    setNewTitle(post.title);
    setNewContent(post.content);

    setImage(post.image);
    setModalVisible(true);
  };

  const updatePost = () => {
    if (editingPost) {
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id
          ? {
              ...post,
              category: newCategory,
              title: newTitle,
              content: newContent,
              image: image,
            }
          : post
      );
      setPosts(updatedPosts);
      setEditingPost(null);
      setNewCategory("");
      setNewTitle("");
      setNewContent("");

      setImage(null);
      setModalVisible(false);
    }
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setNewCategory("");
    setNewTitle("");
    setNewContent("");

    setImage(null);
    setModalVisible(false);
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const pickImage = async () => {
    const hasPermission = await getPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("권한이 필요합니다.");
        return false;
      }
      return true;
    }
  };

  const searchFilter = (item) => {
    const titleMatch = item.title
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    const contentMatch = item.content
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    const categoryMatch = item.category
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    return titleMatch || contentMatch || categoryMatch;
  };

  useEffect(() => {
    setFilteredPosts(posts.filter(searchFilter));
  }, [searchKeyword, posts]);

  // BackHandler 추가
  useEffect(() => {
    const backAction = () => {
      if (isGuideModalVisible) {
        setGuideModalVisible(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isGuideModalVisible]);

  return (
    <View style={{ flex: 1, padding: 7 }}>
      {/* 빈칸 */}

      <TextInput
        style={[styles.searchInput, { marginTop: 45 }]}
        placeholder="  게시판 제목"
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
      />

      <TouchableOpacity
        style={[
          styles.searchInput,
          {
            marginTop: 0,
            marginBottom: 10,
            backgroundColor: "lightgray",
            padding: 10,
          },
        ]}
        onPress={() => setGuideModalVisible(true)}
      >
        <Text>🏴 커뮤니티 사용 가이드</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.flatListItem}>
            <TouchableOpacity
              onPress={() => {
                router.navigate("Boards");
              }}
              onLongPress={() =>
                setEditingItem(editingItem === item ? null : item)
              }
            >
              <View style={{ flexDirection: "row" }}>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 80,
                      height: 80,
                      marginRight: 10,
                      marginBottom: 0,
                    }}
                  />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.title}
                  </Text>
                  <Text>
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      카테고리:
                    </Text>{" "}
                    {item.category}
                  </Text>
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    {item.content}
                  </Text>
                  <Text style={{ color: "gray", fontSize: 12 }}>
                    {formatDate(item.id)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {editingItem === item && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  title="수정"
                  onPress={() => editPost(item)}
                  color="#8A2BE2"
                />
                <Button
                  title="삭제"
                  onPress={() => deletePost(item.id)}
                  color="#8A2BE2"
                />
              </View>
            )}
          </View>
        )}
      />

      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
        }}
      >
        <Button
          title="작성"
          onPress={() => setModalVisible(true)}
          color="#8A2BE2"
          style={{ paddingVertical: 10 }}
        />
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={false}>
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 24, marginBottom: 20 }}>
              {editingPost ? "게시판 수정" : "게시판 생성"}
            </Text>
          </View>

          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, marginBottom: 10 }}
            />
          )}
          <Button title="이미지 업로드" onPress={pickImage} color="#8A2BE2" />

          <TextInput
            style={[styles.textInput, { marginTop: 10 }]}
            placeholder="제목"
            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="카테고리"
            value={newCategory}
            onChangeText={(text) => setNewCategory(text)}
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              padding: 8,
              marginBottom: 10,
              minHeight: 380,
              textAlign: "left",
              textAlignVertical: "top",
            }}
            placeholder="내용을 입력하세요"
            value={newContent}
            onChangeText={(text) => setNewContent(text)}
            multiline={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.fullWidthButton}
              onPress={editingPost ? updatePost : addPost}
            >
              <Text style={styles.fullWidthButtonText}>
                {editingPost ? "수정" : "생성"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      <Modal
        visible={isGuideModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setGuideModalVisible(false)} // BackHandler로 변경
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>커뮤니티 사용 가이드</Text>
            <Text>1. 게시물 형식 준수.</Text>
            <Text>2. 도배성 게시물 금지.</Text>
            <Text>3. 회원 간의 배려와 존중.</Text>
            <Text>4. 타인에 대한 비방 금지.</Text>
            <Text>5. 주제에 맞는 콘텐츠 작성.</Text>
            <Text> </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setGuideModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const formatDate = (timestamp) => {
  const currentDate = new Date();
  const postDate = new Date(timestamp);
  const timeDiff = Math.floor((currentDate - postDate) / (60 * 1000)); // 시간 차이를 분 단위로 계산

  const pad = (num) => {
    return num < 10 ? "0" + num : num;
  };

  if (timeDiff < 1) {
    return "방금 전";
  } else if (timeDiff < 60) {
    return `${timeDiff}분 전 / ${postDate.getFullYear()}.${pad(
      postDate.getMonth() + 1
    )}.${pad(postDate.getDate())}`;
  } else if (timeDiff < 1440) {
    return `${Math.floor(
      timeDiff / 60
    )}시간 전 / ${postDate.getFullYear()}.${pad(postDate.getMonth() + 1)}.${pad(
      postDate.getDate()
    )}`;
  } else {
    return `${postDate.getFullYear()}.${pad(postDate.getMonth() + 1)}.${pad(
      postDate.getDate()
    )}`;
  }
};

const styles = StyleSheet.create({
  flatListItem: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    textAlign: "left", // 좌로 정렬
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  closeButton: {
    position: "absolute",
    bottom: 5,
    right: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  fullWidthButton: {
    backgroundColor: "#8A2BE2",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  fullWidthButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1, // 테두리 두께
    borderColor: "black", // 테두리 색상
    borderRadius: 20, // 테두리 모양
  },
});
