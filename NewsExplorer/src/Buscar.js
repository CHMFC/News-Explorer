import React, { useState, useEffect } from "react";
import {
  Button,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";

const NEWS_API_KEY = "bba3df2699cf480f9e466349ed84fb8b";

export default function SearchNews({ onAddToHistory, initialKeyword }) {
  const [keyword, setKeyword] = useState(initialKeyword || "");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialKeyword) {
      fetchNews(initialKeyword);
    }
  }, [initialKeyword]);

  const fetchNews = async (searchKeyword = keyword) => {
    if (!searchKeyword.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchKeyword}&language=pt&apiKey=${NEWS_API_KEY}`
      );
      setArticles(response.data.articles);
      onAddToHistory(searchKeyword);
    } catch (error) {
      console.error("Error fetching the news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeTitleContainerStyle}>
        <Text style={styles.homeTitleTextStyle}>Buscar Notícias</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Digite a palavra-chave"
        value={keyword}
        onChangeText={setKeyword}
      />
      <Button title="Buscar" onPress={() => fetchNews(keyword)} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {articles.map((article, index) => (
          <TouchableOpacity
            key={index}
            style={styles.articleContainer}
            onPress={() => handlePress(article.url)}
          >
            <View style={styles.articleOriginContainer}>
              <Text style={styles.articleOriginText}>
                {article.author ? article.author : "Desconhecido"}
              </Text>
            </View>
            {article.urlToImage && (
              <Image
                source={{ uri: article.urlToImage }}
                style={styles.image}
                resizeMode="contain"
              />
            )}
            <View style={styles.articleTitleContainer}>
              <Text style={styles.articleTitle}>{article.title}</Text>
            </View>
            <View style={styles.articleContentContainer}>
              <Text style={styles.articleContent}>{article.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  homeTitleContainerStyle: {
    marginBottom: 16,
    width: "90%",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeTitleTextStyle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderColor: "rgba(80,80,255,255)",
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
  },
  resultsContainer: {
    alignItems: "center",
  },
  articleContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(150,150,255,255)",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "90%",
  },
  articleOriginContainer: {
    backgroundColor: "rgba(100,100,255,100)",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  articleOriginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  articleTitleContainer: {
    marginBottom: 5,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  articleContentContainer: {
    marginBottom: 5,
  },
  articleContent: {
    fontSize: 16,
  },
});
