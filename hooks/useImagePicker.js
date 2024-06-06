// hooks/useImagePicker.js
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { usePermission } from "./usePermission";

const useImagePicker = ({ maxImages = 5, imageWidth = 800 }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const hasPermission = usePermission();

  const pickImages = async () => {
    if (!hasPermission) {
      console.warn("Gallery access is required to select images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: maxImages,
      quality: 1,
      selected: selectedImages.map((uri) => ({ uri })),
    });

    if (!result.canceled) {
      const processedImages = await Promise.all(
        result.assets.map(async (asset) => {
          const croppedImage = await ImageManipulator.manipulateAsync(
            asset.uri,
            [
              {
                crop: {
                  originX: 0,
                  originY: 0,
                  width: asset.width,
                  height: asset.height,
                },
              },
            ],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
          );

          const resizedImage = await ImageManipulator.manipulateAsync(
            croppedImage.uri,
            [{ resize: { width: imageWidth } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
          );

          return resizedImage.uri;
        })
      );
      setSelectedImages(processedImages);
    }
  };

  return { selectedImages, pickImages };
};

export { useImagePicker };
