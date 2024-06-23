import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import articlesData from '../assets/articles.json';
import BottomMenu from '../components/BottomMenu'; // Import BottomMenu component

const articleImages = {
  steroids: require('../assets/home/steroids.png'),
  depression: require('../assets/home/depression.png'),
  burgers: require('../assets/home/burgers.png'),
  'social-anxiety': require('../assets/home/social-anxiety.png'),
  hugging: require('../assets/home/hugging.png'),
};

const Articles = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Articles</Text>
      </View>
      <ScrollView style={styles.contentScroll}>
        <View style={styles.articlesContainer}>
          {articlesData.map((article, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.articleCard} 
              onPress={() => navigation.navigate('ArticleDetail', { articleId: index })}
            >
              <Image source={articleImages[article.image]} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <Text style={styles.articleAuthor}>{article.author}</Text>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <View style={styles.articleFooter}>
                  <Text style={styles.articleDate}>{article.date}</Text>
                  <View style={styles.articleViews}>
                    <FontAwesome name="eye" size={12} color="#7582A2" />
                    <Text style={styles.articleViewsText}>{article.views}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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
  articlesContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
  articleCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 315,
    height: 100,
    marginBottom: 25,
    overflow: 'hidden',
    shadowColor: '#5C68A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  articleImage: {
    width: 83,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  articleContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  articleAuthor: {
    color: '#7582A2',
    fontSize: 8,
    fontWeight: '500',
  },
  articleTitle: {
    fontSize: 14,
    color: '#162050',
    fontWeight: 'bold',
    width: 215,
    height: 42,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleDate: {
    color: '#7582A2',
    fontSize: 8,
    fontWeight: '500',
  },
  articleViews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleViewsText: {
    color: '#7582A2',
    fontSize: 8,
    fontWeight: '500',
    marginLeft: 5,
  },
});

export default Articles;
