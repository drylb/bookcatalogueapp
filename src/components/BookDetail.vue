<template>
  <div>
    <div class="book-explore">
      <img src="../assets/arrow.svg" alt="SVG arrow"/>
      <router-link to="/" class="back-button">Explore</router-link>
    </div>
    <div v-if="book" class="book-detail">
      <img :src="book.image" :alt="book.title" class="book-cover fixed-orientation" />
      <div class="book-info">
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-author">{{ book.author }}</p>
        <p class="book-publicationYear">{{ book.publicationYear }}</p>
        <p class="book-price">{{ book.price }}</p>
        <p class="book-publisher">{{ book.publisher }}</p>
      </div>
      <StarRating :showNumber="true" :stars="book.rating" :max-rating="5" />
      <div class="book-description">{{ book.description}}</div>
    </div>
    <div class="submitted" v-if="isSubmitted">{{ userInfoText }}</div>
    <form v-if="!isSubmitted" @submit.prevent="submitReview">
      <div class="form-group">
        <p class="review">Write review</p>
        <p class="rate-the-book">Rate the book</p>
        <StarRating :showNumber="false" @input="handleRating" :stars="bookRating" :max-rating="5"/>
      </div>
      <textarea v-model="reviewText" id="review" rows="5"></textarea>
      <button type="submit" class="submit-btn" :class="{ 'submitted': isSubmitted }">{{ userInfoText }}</button>
    </form>
  </div>
</template>

<script>
import booksData from '@/books.json';
import StarRating from './StarRating.vue';

export default {
  data() {
    return {
      book: null,
      reviewText: '',
      bookRating: null,
      userInfoText: 'Submit Review',
      isSubmitted: false,
    };
  },
  methods: {
    fetchBook() {
      const bookId = this.$route.params.id;
      this.book = booksData.books.find((book) => book.id == bookId);
    },
    submitReview() {
      const reviewData = {
        bookId: this.book.id,
        bookRating: this.bookRating,
        reviewText: this.reviewText,
      };

      this.userInfoText = 'Thank you! Review received';
      this.isSubmitted = true;

      fetch(`https://enc5n9xj7zlt.x.pipedream.net/book-id-${this.book.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Review submission failed.');
        }
        console.log('review sent:', response);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
        this.userInfoText = 'Failed, please try again';
      });
    },
    handleRating(index) {
      this.bookRating = index;
    }
  },
  mounted() {
    this.fetchBook();
  },
  components: {
    StarRating
  }
};
</script>

<style scoped>

form {
  display: grid;
}

.book-detail {
  display: grid;
  grid-template-columns: 115px 150px;
  margin-top: 20px;
  padding-right: 10px;
}

@media(min-width: 960px) {
  .book-detail {
    grid-template-columns: 125px 150px 250px;
  }
}

.book-info {
  grid-column: 2 / span 3;
  line-height: 150%;
}

@media (min-width: 960px) {
  .book-info {
    grid-column: 2 span;
  }
}

.review-form {
  margin-top: 20px;
  display: grid;
}

textarea {
  max-width: 508px;
  height: 110px;
  resize: vertical;
  margin-bottom: 2%;
  margin-left: 1%;
  margin-right: 1%
}

.submit-btn {
  padding: 10px 20px;
  background-color: #FFF;
  color: #3981B2;
  border: 1px solid #3981B2;
  border-radius: 24px;
  cursor: pointer;
}

@media (min-width: 555px) {
  .submit-btn {
    max-width: 132px;
    margin-left: 10px;
  }
}

.submitted {
  background-color: #CFEBFF;
  margin-top: 30px;
  margin-left: 10px;
  width: fit-content;
  padding: 8px;
  border-radius: 4px;
  font-weight: 700;
}

.submit-btn:hover {
  background-color: #3981B2;
  color: #FFF;
}

.back-button {
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  text-decoration-line: underline;
  color: black;
}

.book-explore {
  display: flex;
}

.book-description {
  grid-column: 1 / span 3;
  padding: 10px
}

@media (min-width: 960px) {
  .book-description {
    grid-column: 4;
    grid-row: 1 / 5;
    padding-right: 5%;
  }
}

@media (min-width: 1200px) {
  .book-description {
    padding-right: 25%;
  }
}


.review{
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 0.3em;
}

.rate-the-book {
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0.5em;
}

.book-title {
  font-size: 24px;
}


</style>
