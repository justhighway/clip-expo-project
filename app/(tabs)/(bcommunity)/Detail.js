import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ionicons를 import

const Detail = ({ route }) => {
  const { title, category, keywords, content, purchase, trade, timestamp } = route.params;
  const [imageUri, setImageUri] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0); // State for keeping track of likes

  const getImageUri = async () => {
    const imageUri = route.params.image;
    setImageUri(imageUri);
  };

  useEffect(() => {
    getImageUri();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day}  ${hours}:${minutes}`;
  };

  const toggleImageModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, { text: comment, timestamp: new Date() }]);
      setComment('');
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
      <Text style={styles.text}>↔  {trade}</Text>
      <Text>  </Text>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>상품 가격: {category}</Text>
        <Text style={styles.text}>상품 상태: {keywords}</Text>
        <Text style={styles.text}>구매 시기: {purchase}</Text>
        <Text>  </Text>
        <Text style={styles.text}>{content}</Text>
      </View>
      
      {/* Image */}
      {imageUri && (
        <TouchableOpacity onPress={toggleImageModal}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>
      )}
      
      {/* Image Modal */}
      <Modal visible={isImageModalVisible} transparent={true} onRequestClose={toggleImageModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleImageModal}>
            <Text style={styles.closeButtonText}> X </Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUri }} style={styles.modalImage} />
        </View>
      </Modal>

      {/* Comments */}
      <View style={styles.commentContainer}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentTitle}>💬</Text>
          {/* Display the number of likes */}
          <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
            <Ionicons name="heart" size={28} color="red" />
            <Text style={styles.likeButtonText}>{likes}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="댓글을 입력하세요"
            onChangeText={handleCommentChange}
            value={comment}
          />
          <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
            <Ionicons name="arrow-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* 댓글 목록 */}
        <View style={styles.commentsContainer}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentWrapper}>
              <View style={styles.commentContainer}>
                <View style={styles.commentContent}>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <Text style={styles.commentTimestamp}>{formatTimestamp(comment.timestamp)}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  contentContainer: {
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 125,
    height: 125,
    marginTop: 25,
    alignSelf: 'flex-start',
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 5,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Comments styles
  commentContainer: {
    marginTop: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5, 
  },
  likeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  likeIcon: {
    marginLeft: 5, // 아이콘과 숫자 사이의 간격 조정
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  commentButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentText: {
    marginBottom: 5,
  },
  commentTimestamp: {
    color: 'gray',
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 5, // 수평 경계선의 상단 및 하단 간격
  },
  commentWrapper: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    paddingHorizontal: 10, // 좌우 여백 조정
    paddingVertical: 5, // 상하 여백 조정
    marginBottom: 5,
  },
});

export default Detail;
