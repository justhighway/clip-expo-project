import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { postItem } from "@/api/items";
import ImagePickerButton from "@/components/ImagePickerButton";
import CustomButton from "@/components/CustomButton";
import { Slider } from "@miblanchard/react-native-slider";
import { colors } from "@/constants/colors";

const AddItemScreen = () => {
  const [itemPictures, setItemPictures] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [sliderValue, setSliderValue] = useState(1);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 4,
      quality: 1,
    });

    if (!result.canceled) {
      const resizedImages = await Promise.all(
        result.assets.map(async (asset) => {
          const manipulatedImage = await ImageManipulator.manipulateAsync(
            asset.uri,
            [{ resize: { width: 800 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
          );
          return manipulatedImage.uri;
        })
      );
      setItemPictures(resizedImages);
    }
  };

  const handleValueChange = (value) => {
    setSliderValue(Number(value));
  };

  const handleAddItem = async () => {
    const formData = new FormData();

    formData.append(
      "json",
      JSON.stringify({
        itemsCategorySeq: 2,
        itemName,
        itemPrice: Number(itemPrice),
        itemCondition: sliderValue,
        itemDescription,
        itemStatus: "before",
      })
    );

    itemPictures.forEach((uri, index) => {
      const filename = uri.split("/").pop();
      const type = filename.split(".").pop();
      formData.append("profileImg", {
        uri,
        name: filename,
        type: `image/${type}`,
      });
    });

    try {
      await postItem(formData);
      console.log("Item successfully added!");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imagePickerContainer}>
        <ScrollView horizontal contentContainerStyle={styles.imageScroll}>
          <ImagePickerButton onPress={pickImage} />

          {itemPictures.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </ScrollView>
      </View>
      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
      />
      <Text style={styles.label}>Item Price</Text>
      <TextInput
        style={styles.input}
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Item Condition</Text>
      <Slider
        value={sliderValue}
        minimumValue={1}
        maximumValue={9}
        step={1}
        minimumTrackTintColor={colors.PURPLE600}
        maximumTrackTintColor="#b3b3b3" // 기본값 사용 가능
        thumbTintColor={colors.PURPLE600}
        onValueChange={handleValueChange}
      />
      <Text style={styles.label}>Item Category</Text>
      <TextInput
        style={styles.input}
        value={itemCategory}
        onChangeText={setItemCategory}
      />
      <Text style={styles.label}>Item Description</Text>
      <TextInput
        style={styles.input}
        value={itemDescription}
        onChangeText={setItemDescription}
        multiline
      />
      <CustomButton label="추가하기" onPress={handleAddItem} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imagePickerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  imageScroll: {
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default AddItemScreen;
