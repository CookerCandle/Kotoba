import React from "react";
import axios from "axios";
import Words from "../components/Words";
import * as wanakana from "wanakana";
import FilterButton from "../components/FilterButton";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      allWords: [],
      filteredWords: [],
      selectedFiles: []
    };

    this.files = [
      { name: "N3", url: "https://raw.githubusercontent.com/CookerCandle/KotobaSearcher/main/data/N3_words.json" },
      { name: "new kanji", url: "https://raw.githubusercontent.com/CookerCandle/KotobaSearcher/main/data/new-kanji.json" }
      // сюда добавь остальные
    ];
  }

  componentDidMount() {
    Promise.all(this.files.map(f => axios.get(f.url)))
      .then(responses => {
        const allWords = responses.flatMap((res, index) =>
          res.data.flatMap(item =>
            item["so'zlar"].map(word => ({
              ...word,
              source: this.files[index].url,
              lesson: this.files[index].name, // Название файла
              dars: item.dars // <-- сюда записываем номер урока из JSON
            }))
          )
        );

        this.setState({
          allWords,
          selectedFiles: this.files.map(f => f.url)
        });
      })
      .catch(err => console.error("Ошибка загрузки:", err));
  }


  handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    this.setState({ text }, () => this.applyFilters(text));
  };

  applyFilters = (searchText) => {
    const text = (searchText ?? this.state.text).toLowerCase();
    const { allWords, selectedFiles } = this.state;

    // если поле поиска пустое, то очищаем список
    if (!text) {
      this.setState({ filteredWords: [] });
      return;
    }

    let filtered = allWords.filter(word =>
      selectedFiles.includes(word.source)
    );

    filtered = filtered.filter(word => {
      const kana = word.kana?.toLowerCase() || "";
      const jp = word.jp?.toLowerCase() || "";
      const romaji = wanakana.toRomaji(jp).toLowerCase();
      const uzb = word.uzb?.toLowerCase() || "";

      return (
        kana.includes(text) ||
        jp.includes(text) ||
        romaji.includes(text) ||
        uzb.includes(text)
      );
    });

    this.setState({ filteredWords: filtered });
  };


  setSelectedFiles = (files) => {
    this.setState({ selectedFiles: files }, () => {
      this.applyFilters();
    });
  };

  render() {
    return (
      <div className="container">
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search kotoba..."
            value={this.state.text}
            onChange={this.handleSearch}
            className="search-input"
          />
          <FilterButton
            files={this.files}
            selectedFiles={this.state.selectedFiles}
            setSelectedFiles={this.setSelectedFiles}
          />
        </div>

        <Words words={this.state.filteredWords} searchText={this.state.text} />
      </div>
    );
  }
}

export default HomePage;
