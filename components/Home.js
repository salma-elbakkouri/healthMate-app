import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import articlesData from '../assets/articles.json';
import tipsData from '../assets/tips.json'; 
import BottomMenu from '../components/BottomMenu';

const articleImages = {
  steroids: require('../assets/steroids.png'),
  depression: require('../assets/depression.png'),
  burgers: require('../assets/burgers.png'),
  'social-anxiety': require('../assets/social-anxiety.png'),
  hugging: require('../assets/hugging.png'),
};

const tipImages = {
  depressiontip: require('../assets/depressiontip.png'),
  nutritiontip: require('../assets/nutritiontip.png'),
  catshealthtip: require('../assets/catshealthtip.png'),
  socialmediatip: require('../assets/socialmediatip.png'),
};

const Home = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('articles');

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'articles':
        return (
          <View style={styles.articlesContainer}>
            <View style={styles.articlesTitleContainer}>
              <Text style={styles.articlesTitle}>Recent Articles</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Articles')}>
                <Text style={styles.viewAllText}>view all</Text>
              </TouchableOpacity>
            </View>
            {articlesData.slice(0, 5).map((article, index) => (
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
        );
      case 'tips':
        return (
          <View style={styles.tipsContainer}>
            <View style={styles.articlesTitleContainer}>
              <Text style={styles.articlesTitle}>Famous Topics</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Tips')}>
                <Text style={styles.viewAllText}>view all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tipsContent}>
              {tipsData.map((tip, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tipCard}
                  onPress={() => navigation.navigate('TipDetail', { tipId: index })}
                >
                  <Image source={tipImages[tip.image]} style={styles.tipImage} />
                  <View style={styles.tipOverlay}>
                    <Text style={styles.tipSubject}>{tip.subject}</Text>
                    <View style={styles.tipViews}>
                      <FontAwesome name="eye" size={12} color="white" />
                      <Text style={styles.viewsText}>{`${tip.views} views`}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 'stats':
        return <Text style={styles.placeholderText}>Stats Content</Text>;
      case 'records':
        return <Text style={styles.placeholderText}>Records Content</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <View style={styles.headerContent}>
          <View style={styles.leftContent}>
            <Text style={styles.usernameText}>Hello username</Text>
            <Text style={styles.healthText}>Improve Your Health</Text>
          </View>
          <View style={styles.rightContent}>
            <Image
              source={require('../assets/doctor.png')}
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>

      <LinearGradient colors={['#4E869D', '#C6E3E1']} style={styles.gradientBackground}>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome to Health Mate</Text>
          <Image source={require('../assets/doctor.png')} style={styles.doctorImage} />
        </View>
      </LinearGradient>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.quickActionsText}>Quick Actions</Text>
        <View style={styles.categoriesContainer}>
          {['articles', 'tips', 'stats', 'records'].map((category) => (
            <View key={category} style={styles.categoryWrapper}>
              <TouchableOpacity
                style={[styles.category, activeCategory === category && styles.categoryActive]}
                onPress={() => handleCategoryPress(category)}
              >
                <FontAwesome
                  name={
                    category === 'articles' ? 'newspaper-o' :
                    category === 'tips' ? 'lightbulb-o' :
                    category === 'stats' ? 'pie-chart' :
                    'hashtag'
                  }
                  size={22}
                  color={activeCategory === category ? 'white' : '#79BAD3'}
                />
              </TouchableOpacity>
              <Text style={[styles.categoryText, activeCategory === category && styles.categoryTextActive]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={styles.contentScroll}>
        {renderContent()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftContent: {
    flex: 1,
  },
  usernameText: {
    fontSize: 14,
    color: '#888B94',
  },
  healthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3C42',
  },
  rightContent: {
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  gradientBackground: {
    height: 150,
    width: '90%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    marginTop: 15,
    position: 'relative',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 20,
    width: '40%',
    lineHeight: 25,
  },
  doctorImage: {
    width: 150,
    height: 180,
    bottom: 15,
    right: 14,
  },
  quickActionsContainer: {
    width: '90%',
  },
  quickActionsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3C42',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryWrapper: {
    alignItems: 'center',
  },
  category: {
    width: 65,
    height: 65,
    backgroundColor: 'white',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryActive: {
    backgroundColor: '#79BAD3',
  },
  categoryText: {
    fontSize: 12,
    color: '#888B94',
    marginTop: 5,
  },
  categoryTextActive: {
    color: '#79BAD3',
  },
  contentScroll: {
    width: '90%',
    marginTop: 20,
  },
  articlesContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 80,
  },
  articlesTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 6,
    marginBottom: 10,
  },
  articlesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3C42',
  },
  viewAllText: {
    fontSize: 14,
    color: '#888B94',
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
    elevation: 4, // For Android shadow
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
  placeholderText: {
    fontSize: 16,
    color: '#888B94',
  },
  tipsContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 80,
  },
  tipsContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  tipCard: {
    width: '48%',
    height: 150,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  tipImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  tipOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
  },
  tipSubject: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tipViews: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  viewsText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
});

export default Home;
