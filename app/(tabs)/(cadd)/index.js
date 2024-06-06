import React, { useReducer, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { colors } from "@/constants";
import {
  InputField,
  CustomButton,
  ImageModal,
  ImagePickerButton,
} from "@/components";
import { useForm, useImagePicker, useFormData } from "@/hooks";
import { validateAddItem } from "@/utils";

const initialState = {
  sliderValue: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SLIDER_VALUE":
      return { ...state, sliderValue: action.payload };
    default:
      return state;
  }
};

const AddItemScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const { values, errors, touched, getTextInputProps } = useForm({
    initialValue: {
      itemName: "",
      itemPrice: "",
      itemCategory: "",
      itemDescription: "",
    },
    validate: validateAddItem,
  });

  const itemNameRef = useRef(null);
  const itemPriceRef = useRef(null);
  const itemCategoryRef = useRef(null);
  const itemDescriptionRef = useRef(null);

  const { selectedImages, pickImages } = useImagePicker({
    maxImages: 4,
    imageWidth: 800,
  });
  const { handleAddItem, isSubmitting } = useFormData(
    values,
    selectedImages,
    state.sliderValue
  );

  const handleValueChange = (value) => {
    dispatch({ type: "SET_SLIDER_VALUE", payload: Number(value) });
  };

  const openModal = (uri) => {
    setSelectedImageUri(uri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImageUri(null);
  };

  const renderThumbComponent = () => (
    <View style={styles.thumb}>
      <Text style={styles.thumbText}>{state.sliderValue}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imagePickerContainer}>
          <ScrollView horizontal contentContainerStyle={styles.imageScroll}>
            <ImagePickerButton onPress={pickImages} />

            {selectedImages.map((uri, index) => (
              <TouchableOpacity key={index} onPress={() => openModal(uri)}>
                <Image source={{ uri }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Text style={styles.label}>Item Name</Text>
        <InputField
          {...getTextInputProps("itemName")}
          error={errors.itemName}
          touched={touched.itemName}
          returnKeyType="next"
          onSubmitEditing={() => itemPriceRef.current.focus()}
          ref={itemNameRef}
        />
        <Text style={styles.label}>Item Price</Text>
        <InputField
          {...getTextInputProps("itemPrice")}
          error={errors.itemPrice}
          touched={touched.itemPrice}
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => itemCategoryRef.current.focus()}
          ref={itemPriceRef}
        />
        <Text style={styles.label}>Item Condition</Text>
        <Slider
          value={state.sliderValue}
          minimumValue={1}
          maximumValue={9}
          step={1}
          minimumTrackTintColor={colors.PURPLE600}
          maximumTrackTintColor="#b3b3b3"
          thumbTintColor={colors.PURPLE600}
          onValueChange={handleValueChange}
          renderThumbComponent={renderThumbComponent}
        />
        <Text style={styles.label}>Item Category</Text>
        <InputField
          {...getTextInputProps("itemCategory")}
          error={errors.itemCategory}
          touched={touched.itemCategory}
          returnKeyType="next"
          onSubmitEditing={() => itemDescriptionRef.current.focus()}
          ref={itemCategoryRef}
        />
        <Text style={styles.label}>Item Description</Text>
        <InputField
          {...getTextInputProps("itemDescription")}
          error={errors.itemDescription}
          touched={touched.itemDescription}
          multiline
          ref={itemDescriptionRef}
        />
        <ImageModal
          isVisible={modalVisible}
          imageUri={selectedImageUri}
          onClose={closeModal}
        />
      </ScrollView>
      <CustomButton
        label="추가하기"
        onPress={handleAddItem}
        disabled={isSubmitting}
        style={styles.floatingButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // Make space for the floating button
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
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
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.PURPLE600,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbText: {
    color: colors.WHITE,
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    alignSelf: "center",
  },
});

export default AddItemScreen;
