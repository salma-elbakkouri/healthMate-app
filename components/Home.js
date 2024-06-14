import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; // For icons

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('articles');

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'articles':
        return (
          <View style={styles.articlesContainer}>
            {[...Array(4)].map((_, index) => (
              <View key={index} style={styles.articleCard}>
                <Image
                  source={require('../assets/doctor.png')}
                  style={styles.articleImage}
                />
                <View style={styles.articleContent}>
                  <Text style={styles.articleAuthor}>Samantha Jess</Text>
                  <Text style={styles.articleTitle}>Why are steroids bad for your fitness journey?</Text>
                  <View style={styles.articleFooter}>
                    <Text style={styles.articleDate}>2 days ago</Text>
                    <View style={styles.articleViews}>
                      <FontAwesome name="eye" size={12} color="#7582A2" />
                      <Text style={styles.articleViewsText}>700</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
      case 'tips':
        return <Text style={styles.placeholderText}>Tips Content</Text>;
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
              source={require('../assets/doctor.png')} // Assuming you have user.png here
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>

      <LinearGradient
        colors={['#4E869D', '#C6E3E1']}
        style={styles.gradientBackground}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome to Health Mate</Text>
          <Image
            source={require('../assets/doctor.png')}
            style={styles.doctorImage}
          />
        </View>
      </LinearGradient>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.quickActionsText}>Quick Actions</Text>
        <View style={styles.categoriesContainer}>
          {['articles', 'tips', 'stats', 'records'].map((category) => (
            <View key={category} style={styles.categoryWrapper}>
              <TouchableOpacity
                style={[
                  styles.category,
                  activeCategory === category && styles.categoryActive,
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <FontAwesome
                  name={
                    category === 'articles' ? 'file-text' :
                    category === 'tips' ? 'lightbulb-o' :
                    category === 'stats' ? 'bar-chart' :
                    'hashtag'
                  }
                  size={24}
                  color={activeCategory === category ? 'white' : '#79BAD3'}
                />
              </TouchableOpacity>
              <Text style={[
                styles.categoryText,
                activeCategory === category && styles.categoryTextActive,
              ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={styles.contentScroll}>
        {renderContent()}
      </ScrollView>
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
    height: 120,
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
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '80%',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  doctorImage: {
    width: 120,
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    right: 0,
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
    width: 70,
    height: 70,
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
  },
  articlesContainer: {
    alignItems: 'center',
  },
  articleCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 333,
    height: 100,
    marginBottom: 10,
    overflow: 'hidden',
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
});

export default Home;
