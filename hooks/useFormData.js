// hooks/useFormData.js
import { useState } from "react";
import { postItem } from "@/api/items";

const useFormData = (values, selectedImages, sliderValue) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddItem = async () => {
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append(
      "json",
      JSON.stringify({
        itemsCategorySeq: 2,
        itemName: values.itemName,
        itemPrice: Number(values.itemPrice),
        itemCondition: sliderValue,
        itemDescription: values.itemDescription,
      })
    );

    selectedImages.forEach((uri, index) => {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleAddItem, isSubmitting };
};

export { useFormData };
