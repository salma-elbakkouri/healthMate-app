import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import articlesData from '../assets/articles.json';
import BottomMenu from '../components/BottomMenu'; // Import BottomMenu component

const articleImages = {
  steroidsbig: require('../assets/steroidsbig.png'),
  depressionbig: require('../assets/depressionbig.png'),
  burgersbig: require('../assets/burgersbig.png'),
  'social-anxietybig': require('../assets/social-anxietybig.png'),
  huggingbig: require('../assets/huggingbig.png'),
};

const ArticleDetail = ({ route, navigation }) => {
  const { articleId } = route.params;
  const article = articlesData[articleId];

  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Article Detail</Text>
      </View>
      <ScrollView style={styles.contentScroll}>
        <View style={styles.articleDetailContainer}>
          <View style={styles.articleDetailHeader}>
            <Text style={styles.articleAuthor}>{article.author}</Text>
            <View style={styles.articleViews}>
              <FontAwesome name="eye" size={12} color="#7582A2" />
              <Text style={styles.articleViewsText}>{article.views}</Text>
            </View>
          </View>
          <Image source={articleImages[article.imagebig]} style={styles.articleImage} />
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleDescription}>{article.description}</Text>
          <Text style={styles.articleSectionTitle}>Symptoms</Text>
          <Text style={styles.articleDescription}>{article.symptoms}</Text>
          <Text style={styles.articleSectionTitle}>Solutions</Text>
          <Text style={styles.articleDescription}>{article.solutions}</Text>
          <Text style={styles.articleSectionTitle}>Tips</Text>
          <Text style={styles.articleDescription}>{article.tips}</Text>
        </View>
      </ScrollView>

      {/* Include the BottomMenu component */}
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
  },
  whiteHeader: {
    height: 110,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3C42',
    marginLeft: 20,
  },
  contentScroll: {
    width: '90%',
    marginTop: 10,
  },
  articleDetailContainer: {
    marginBottom: 80,
    marginHorizontal:10,
  },
  articleDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '98%',
  },
  articleAuthor: {
    color: '#7582A2',
    fontSize: 12,
  },
  articleViews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleViewsText: {
    color: '#7582A2',
    fontSize: 12,
    marginLeft: 5,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: 16,
    color: '#162050',
    fontWeight: 'bold',
  },
  articleDescription: {
    fontSize: 12,
    color: '#7582A2',
    marginTop: 7,
    lineHeight:20,
  },
  articleSectionTitle: {
    fontSize: 16,
    color: '#162050',
    fontWeight: 'bold',
    marginTop: 15,
  }
});

export default ArticleDetail;
