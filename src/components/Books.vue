<template>
  <h1>Explore books</h1>
  <div>
    <input type="text" v-model="searchTerm" placeholder="Search for a book"/>
    <p v-if="showBooks" class="book-results">{{ `${filteredBooks.length} results` }}</p>
    <ul v-if="showBooks" class="book-list">
      <li v-for="book in filteredBooks" :key="book.id" class="book-item">
        <router-link :to="`/book/${book.id}`" class="book-link">
          <div class="book-card">
            <img :src="book.image" :alt="book.title" class="book-cover fixed-orientation" loading="lazy"/>
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">{{ book.author }}</p>
              <p class="book-publicationYear">{{ book.publicationYear }}</p>
              <p class="book-price">{{ book.price }}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div v-else class="no-books">
    <p class="mobile-explore-books">Explore books</p>
    <img v-if="!showBooks" src="../assets/book.svg" alt="book" loading="lazy"/>
    </div>
  </div>
</template>

<script>
import booksData from '@/books.json';

export default {
  data() {
    return {
      books: [],
      searchTerm: '',
      showBooks: false,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  computed: {
    filteredBooks() {
      if (this.searchTerm) {
        const regex = new RegExp(this.searchTerm, 'i');
        return this.books.filter((book) => regex.test(book.title));
      }
      return this.books;
    },
  },
  methods: {
    fetchBooks() {
      this.books = booksData.books;
    },
  },
  watch: {
    searchTerm() {
      this.showBooks = !!this.searchTerm;
    },
  },
};
</script>

<style>

h1 {
  display: none;
}

.book-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  grid-gap: 2%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding-top: 5%;
  line-height: 150%;
}

@media (min-width: 700px) {
  .book-list {
    grid-template-columns: repeat(3, 1fr);
  }
  h1 {
    display: flex;
    justify-content: center;
  }
  .mobile-explore-books {
    display: none;
  }
}


.input::before {
  content: "\1F50D";
  display: inline-block;
  font-size: 16px;
  margin-right: 5px;
}

.book-link {
  text-decoration: none;
  color: inherit;
}

.book-card {
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 14px
}

.book-cover {
  border-radius: 4px;
  margin-left: 10px;
}

.book-title,
.book-price {
  font-size: 14px;
  font-weight: 700;
  font-style:normal;
  margin: 2px;
}

.book-author,
.book-publicationYear,
.book-publisher {
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: normal;
  color:#737373;
  margin: 2px;
}

.book-results {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color:#737373;
  margin-bottom: -2%;
  margin-left: 30px;
}

@media (min-width: 960px) {
  .book-results {
    text-align: center;
  }
}

.no-books {
  text-align: center;
  margin-top: 20px;
}

.no-books > p {
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

input {
  min-width: 288px;
  padding: 8px;
  border: 1px solid #DDE1E3;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  background-image: url('../assets/search.svg');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
  background-origin: content-box;
  text-indent: 25px;
}

@media (min-width: 800px) {
  input {
    min-width: 700px;
  }
}

</style>
