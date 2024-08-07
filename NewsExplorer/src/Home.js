import React, { useState, useEffect } from "react";
import {
  Button,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";

const NEWS_API_KEY = "bba3df2699cf480f9e466349ed84fb8b";
const PAGE_SIZE = 20; // Número de artigos por página

export default function Home() {
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Estado para a página atual

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=br&apiKey=${NEWS_API_KEY}&pageSize=${PAGE_SIZE}&page=${page}`
        );
        setArtigos((prevArticles) => [
          ...prevArticles,
          ...response.data.articles,
        ]); 
      } catch (error) {
        console.error("Error fetching the news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]); 

  const loadMoreArticles = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.homeTitleContainerStyle}>
        <Text style={styles.homeTitleTextStyle}>
          Principais notícias do dia
        </Text>
      </View>

      {artigos.map((article, index) => (
        <TouchableOpacity
          key={index}
          style={styles.articleContainerStyle}
          onPress={() => handlePress(article.url)}
        >
          <View style={styles.articleOriginContainerStyle}>
            <Text style={styles.articleOriginTextStyle}>
              {article.author ? article.author : "Desconhecido"}
            </Text>
          </View>
          {artigos.urlToImage && (
              <Image
                source={{ uri: artigos.urlToImage }}
                style={styles.image}
                resizeMode="contain"
              />
            )}
          <View style={styles.articleTitleContainerStyle}>
            <Text style={styles.articleTitleTextStyle}>{article.title}</Text>
          </View>
          <View style={styles.articleContentContainerStyle}>
            <Text style={styles.articleContentTextStyle}>
              {article.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && (
        <Button title="Carregar mais notícias" onPress={loadMoreArticles} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  homeTitleContainerStyle: {
    marginTop: 8,
    marginBottom: 16,
    width: "90%",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  homeTitleTextStyle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  articleContainerStyle: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "90%",
  },
  articleOriginContainerStyle: {
    backgroundColor: "rgba(0,100,255,100)",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  articleOriginTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  articleTitleContainerStyle: {
    marginBottom: 5,
  },
  articleTitleTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  articleContentContainerStyle: {
    marginTop: 5,
    width:"100%",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  articleContentTextStyle: {
    fontSize: 10,
  },
});
