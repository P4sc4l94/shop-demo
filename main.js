
// SHIRTS COMPONENT
Vue.component('shirts', {
  template: `
  <section class="container mt-5 mx-auto">
  <div class="row mx-auto">
    <div class="col-md-4 mx-auto product-img-container">
      <img v-bind:src="image" v-bind:alt="altText" class="img-fluid product-img"/>
    </div>

    <div class="col-md-4 mx-auto product-info">
      <h2>{{title}}</h2>
      <p v-if="inStock" class="pb-0 mb-1">In Stock</p>
        <p v-else class="pb-0 mb-1"><span style="color:red">Out of Stock</span></p>
      <p>Qty. Available: {{shirts[selectedVariant].variantQty}}</p>
      <p class="mb-1 pb-1 fs-5" style="color:steelblue"><b>$ {{ price }}</b></p>

      <div class="row mt-3 mb-3 mx-auto text-center">
        <div v-for="(shirt, index) in shirts" 
          :key="shirt.variantId"
          class="col-4 img-thumbnail"
          :style="{ backgroundImage: 'url(img/' + shirt.variantThumbnail + ')' }"
          @mouseover="updateProduct(index)"> <!-- @ is shorthand for v-on -->
        </div>
      </div>

      <button v-on:click="addToCart"
              class="btn btn-primary" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
            Add to cart
            </button>

            <button v-on:click="removeFromCart"
              class="btn btn-danger"
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }" 
              >
            Remove from cart
            </button>
      <!-- <p>{{shirts[0].variantId}}: {{shirts[0].qtyInCart}}</p>
      <p>{{shirts[1].variantId}}: {{shirts[1].qtyInCart}}</p>
      <p>{{shirts[2].variantId}}: {{shirts[2].qtyInCart}}</p>
      <p>{{totalCalc}}</p> -->
    </div>

    <div class="col-md-4 mx-auto">
      <h3>Item Description</h3>
      <p class="mb-0 fs-5 fw-bold">Details:</p>
      <ul class="mb-3">
        <li v-for="detail in details">{{ detail }} </li>
      </ul>
      <p>{{description}}</p>
    </div>
  </div>
</section>
  `,
  data(){
    return {
      brand: 'Koda',
      product: 'Shirts',
      selectedVariant: 0,
      altText: 'Picture of a Koda brand shirt',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      shirts: [
        {
          variantId: 111,
          name: 'Koda Shirt (Apple)',
          variantStyle:'apple',
          variantQty: 4,
          price: 12.99,
          variantImage: 'img/img-shirt-apple.jpg',
          variantThumbnail: 'img-thumbnail-apple.jpg',
          qtyInCart: 0
        },
        {
          variantId: 112,
          name: 'Koda Shirt (Stars)',
          variantStyle:'stars',
          variantQty: 50,
          price: 10.99,
          variantImage: 'img/img-shirt-stars.jpg',
          variantThumbnail: 'img-thumbnail-stars.jpg',
          qtyInCart: 0
        },
        {
          variantId: 113,
          name: 'Koda Shirt (Peach)',
          variantStyle:'peach',
          variantQty: 0,
          price: 8.99,
          variantImage: 'img/img-shirt-peach.jpg',
          variantThumbnail: 'img-thumbnail-peach.jpg',
          qtyInCart: 0
        },
      ]
    }
  },
  methods: {
    addToCart: function () {
      // this.cart += 1;
      if(this.shirts[this.selectedVariant].variantQty === this.shirts[this.selectedVariant].qtyInCart) {
        return
      } else {
        this.shirts[this.selectedVariant].qtyInCart += 1
      }
      let qty = this.shirts[this.selectedVariant].qtyInCart
      
      
    let shirtsObj = {
        id: this.shirts[this.selectedVariant].variantId,
        price: this.shirts[this.selectedVariant].price,
        style: this.shirts[this.selectedVariant].variantStyle,
        title: this.shirts[this.selectedVariant].name,
        qty
      }

      this.$emit('add-to-cart', shirtsObj)
      // this.$emit('add-to-cart', this.shirts[this.selectedVariant].variantId)
      /*when addToCart is run, emit an event by the name of “add-to-cart”. 
      In other words, when the “Add to Cart” button is clicked, this method fires,
      announcing that the click event just happened*/
    },
    removeFromCart: function () {
      if(this.shirts[this.selectedVariant].qtyInCart === 0)
      {
        return
      } else {
        this.shirts[this.selectedVariant].qtyInCart -= 1
      }
      
      // this.shirts[this.selectedVariant].qtyInCart -= 1
      
      this.$emit('remove-from-cart', this.shirts[this.selectedVariant].variantId)
    },
    updateProduct: function (index) {
      this.selectedVariant = index
      console.log(index)
    },
    // addReview: function (productReview) {
    //   this.reviews.push(productReview);
    // }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.shirts[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.shirts[this.selectedVariant].variantQty;
    },
    price() {
      return this.shirts[this.selectedVariant].price;
    },
    totalCalc() {
      let totals = 0
      totals = this.shirts[0].qtyInCart + this.shirts[1].qtyInCart + this.shirts[2].qtyInCart
      return totals 
    }
  }
})

// SOCKS COMPONENT
Vue.component('socks', {
  template: `
  <section class="container mt-5 mx-auto">
  <div class="row mx-auto">
    <div class="col-md-4 mx-auto product-img-container">
      <img v-bind:src="image" v-bind:alt="altText" class="img-fluid product-img"/>
    </div>

    <div class="col-md-4 mx-auto product-info">
      <h2>{{title}}</h2>
      <p v-if="inStock" class="pb-0 mb-1">In Stock</p>
        <p v-else class="pb-0 mb-1"><span style="color:red">Out of Stock</span></p>
      <p>Qty. Available: {{socks[selectedVariant].variantQty}}</p>
      <p class="mb-1 pb-1 fs-5" style="color:steelblue"><b>$ {{ price }}</b></p>

      <div class="row mt-3 mb-3 mx-auto text-center">
        <div v-for="(sock, index) in socks" 
          :key="sock.variantId"
          class="col-4 img-thumbnail"
          :style="{ backgroundImage: 'url(img/' + sock.variantThumbnail + ')' }"
          @mouseover="updateProduct(index)"> <!-- @ is shorthand for v-on -->
        </div>
      </div>

      <button v-on:click="addToCart" 
        class="btn btn-primary mt-3 mb-4" 
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }">
        Add to Cart
      </button> 
      <!-- triggers the method addToCart every time the btn is clicked -->
      <button @:click="removeFromCart"
        class="btn btn-danger mt-3 mb-4"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }" >
        Remove from Cart
      </button>
    </div>

    <div class="col-md-4 mx-auto">
      <h3>Item Description</h3>
      <p class="mb-0 fs-5 fw-bold">Details:</p>
      <ul class="mb-3">
        <li v-for="detail in details">{{ detail }} </li>
      </ul>
      <p>{{description}}</p>
    </div>
  </div>
</section>
  `,
  data(){
    return {
      brand: 'Allie',
      product: 'Socks',
      selectedVariant: 0,
      altText: 'Picture of a pair of Allie Socks',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      socks: [
        {
        variantId: 311,
        name: 'Allie Sock (Stars)',
        variantStyle:'stars',
        variantQty: 5,
        price: 3.99,
        variantImage: 'img/img-socks-stars.jpg',
        variantThumbnail: 'img-thumbnail-stars.jpg',
        qtyInCart: 0
        },
        {
          variantId: 312,
          name: 'Allie Sock (Peach)',
          variantStyle:'peach',
          variantQty: 25,
          price: 5.99,
          variantImage: 'img/img-socks-peach.jpg',
          variantThumbnail: 'img-thumbnail-peach.jpg',
          qtyInCart: 0
        },
        {
          variantId: 313,
          name: 'Allie Sock (Apple)',
          variantStyle:'apple',
          variantQty: 0,
          price: 6.99,
          variantImage: 'img/img-socks-apple.jpg',
          variantThumbnail: 'img-thumbnail-apple.jpg',
          qtyInCart: 0
        },
      ]
    }
  },
  methods: {
    addToCart: function () {
      // this.cart += 1;
      if(this.socks[this.selectedVariant].variantQty === this.socks[this.selectedVariant].qtyInCart) {
        return
      } else {
        this.socks[this.selectedVariant].qtyInCart += 1
      }
      let qty = this.socks[this.selectedVariant].qtyInCart

      let socksObj = {
        id: this.socks[this.selectedVariant].variantId,
        price: this.socks[this.selectedVariant].price,
        style: this.socks[this.selectedVariant].variantStyle,
        title: this.socks[this.selectedVariant].name,
        qty
      }
      this.$emit('add-to-cart', socksObj)
      // this.$emit('add-to-cart', this.socks[this.selectedVariant].variantId)
      /*when addToCart is run, emit an event by the name of “add-to-cart”. 
      In other words, when the “Add to Cart” button is clicked, this method fires,
      announcing that the click event just happened*/
    },
    removeFromCart: function() {
      if(this.socks[this.selectedVariant].qtyInCart === 0)
      {
        return
      } else {
        this.socks[this.selectedVariant].qtyInCart -= 1
      }

      this.$emit('remove-from-cart', this.socks[this.selectedVariant].variantId)
    },
    updateProduct: function (index) {
      this.selectedVariant = index
      console.log(index)
    },
    // addReview: function (productReview) {
    //   this.reviews.push(productReview);
    // }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.socks[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.socks[this.selectedVariant].variantQty;
    },
    price() {
      return this.socks[this.selectedVariant].price;
    },
    totalCalc() {
      let totals = 0
      totals = this.socks[0].qtyInCart + this.socks[1].qtyInCart + this.socks[2].qtyInCart
      return totals 
    }
  }
})

// HATS COMPONENT
Vue.component('hats', {
  template: `
  <section class="container mt-5 mx-auto">
  <div class="row mx-auto">
    <div class="col-md-4 mx-auto product-img-container">
      <img v-bind:src="image" v-bind:alt="altText" class="img-fluid product-img"/>
    </div>

    <div class="col-md-4 mx-auto product-info">
      <h2>{{title}}</h2>
      <p v-if="inStock" class="pb-0 mb-1">In Stock</p>
        <p v-else class="pb-0 mb-1"><span style="color:red">Out of Stock</span></p>
      <p>Qty. Available: {{hats[selectedVariant].variantQty}}</p>
      <p class="mb-1 pb-1 fs-5" style="color:steelblue"><b>$ {{ price }}</b></p>

      <div class="row mt-3 mb-3 mx-auto text-center">
        <div v-for="(hat, index) in hats" 
          :key="hat.variantId"
          class="col-4 img-thumbnail"
          :style="{ backgroundImage: 'url(img/' + hat.variantThumbnail + ')' }"
          @mouseover="updateProduct(index)"> <!-- @ is shorthand for v-on -->
        </div>
      </div>

      <button v-on:click="addToCart" 
        class="btn btn-primary mt-3 mb-4" 
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }">
        Add to Cart
      </button> 
      <!-- triggers the method addToCart every time the btn is clicked -->
      <button v-on:click="removeFromCart"
        class="btn btn-danger mt-3 mb-4"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }" >
        Remove from Cart
      </button>
    </div>

    <div class="col-md-4 mx-auto">
      <h3>Item Description</h3>
      <p class="mb-0 fs-5 fw-bold">Details:</p>
      <ul class="mb-3">
        <li v-for="detail in details">{{ detail }} </li>
      </ul>
      <p>{{description}}</p>
    </div>
  </div>
</section>
  `,
  data(){
    return {
      brand: 'Bryn',
      product: 'Hats',
      selectedVariant: 0,
      altText: 'Photo of a Bryn Hat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      hats: [
        {
          variantId: 211,
          name: 'Bryn Hat (Peach)',
          variantStyle:'peach',
          variantQty: 25,
          price: 5.99,
          variantImage: 'img/img-hats-peach.jpg',
          variantThumbnail: 'img-thumbnail-peach.jpg',
          qtyInCart: 0
        },
        {
          variantId: 213,
          name: 'Bryn Hat (Apple)',
          variantStyle:'apple',
          variantQty: 0,
          price: 6.99,
          variantImage: 'img/img-hats-apple.jpg',
          variantThumbnail: 'img-thumbnail-apple.jpg',
          qtyInCart: 0
        },
        {
        variantId: 212,
        name: 'Bryn Hat (Stars)',
        variantStyle:'stars',
        variantQty: 5,
        price: 3.99,
        variantImage: 'img/img-hats-stars.jpg',
        variantThumbnail: 'img-thumbnail-stars.jpg',
        qtyInCart: 0
        },
      ]
    }
  },
  methods: {
    addToCart: function () {
      // this.cart += 1;
      if(this.hats[this.selectedVariant].variantQty === this.hats[this.selectedVariant].qtyInCart) {
        return
      } else {
        this.hats[this.selectedVariant].qtyInCart += 1
      }
      let qty = this.hats[this.selectedVariant].qtyInCart

      let hatObj = {
        id: this.hats[this.selectedVariant].variantId,
        price: this.hats[this.selectedVariant].price,
        style: this.hats[this.selectedVariant].variantStyle,
        title: this.hats[this.selectedVariant].name,
        qty
      }
      this.$emit('add-to-cart', hatObj)
      // this.$emit('add-to-cart', this.hats[this.selectedVariant].variantId)
      /*when addToCart is run, emit an event by the name of “add-to-cart”. 
      In other words, when the “Add to Cart” button is clicked, this method fires,
      announcing that the click event just happened*/
    },
    removeFromCart: function() {
      if(this.hats[this.selectedVariant].qtyInCart === 0)
      {
        return
      } else {
        this.hats[this.selectedVariant].qtyInCart -= 1
      }

      this.$emit('remove-from-cart', this.hats[this.selectedVariant].variantId)
    },
    updateProduct: function (index) {
      this.selectedVariant = index
      console.log(index)
    },
    // addReview: function (productReview) {
    //   this.reviews.push(productReview);
    // }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.hats[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.hats[this.selectedVariant].variantQty;
    },
    price() {
      return this.hats[this.selectedVariant].price;
    },
    totalCalc() {
      let totals = 0
      totals = this.hats[0].qtyInCart + this.hats[1].qtyInCart + this.hats[2].qtyInCart
      return totals 
    }
  }
})

//PRODUCT REVIEW COMPONENT
Vue.component('product-review', {
  template: `
  <form class="mb-5" @submit.prevent="onSubmit" width="90%">
    <div v-if="errors.length" class="alert alert-danger alert-dismissible fade show" role="alert">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div v-else></div>
    <p v-else></p>
    <div class="mb-3">
      <label for="name" class="form-label">Name:</label>
      <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter your name...">
    </div>
    <div class="mb-3">
      <input type="date" class="form-control" id="date" v-model="date" style="width:12rem">
    </div>
    <div class="mb-3">
      <label for="review" class="form-label">Review:</label><br>
      <textarea id="review" class="form-control" v-model="review"></textarea>
    </div>
    <div>
      <label for="rating" class="form-label">Rating (out of 5):</label><br>
      <select id="rating" class="form-select" v-model.number="rating" style="width:12rem">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <button type="Submit" class="btn btn-dark mt-3" value="Submit">Submit</button>
  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      date: null,
      errors: [], //for custom form validation
    }
  },
  methods: {
    onSubmit() {
      if(this.name && this.review && this.rating &&this.date){
        //checks if all sections of form are submitted
        //before pushing the data to review-submitted
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          date: this.date
        }
        this.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.date = null
      }
      else {
        //if a part (or all) of the form is missing data
        //show an error message
        if(!this.name) this.errors.push("Name required!")
        if(!this.review) this.errors.push("Review required!")
        if(!this.rating) this.errors.push("Rating required!")
        if(!this.date) this.errors.push("Select a date!")
      }
      
    }
  }
})



//APP INSTANCE
let app = new Vue({
  el: '#app', //plugs instance into the div with an id of "app"
  data: {
    cart: [],
    reviews: [],
    orderNum: Math.floor(Math.random()*1000),
    shirts: [
      {
        variantId: 111,
        name: 'Koda Shirts',
        variantStyle:'apple',
        variantQty: 4,
        price: 12.99,
        variantImage: 'img/img-shirt-apple.jpg',
        variantThumbnail: 'img-thumbnail-apple.jpg',
        details: ["80% cotton", "20% polyester", "Gender-neutral"]
      }
    ],
    hats: [
      {
        variantId: 213,
        name: 'Bryn Hats',
        variantStyle:'peach',
        variantQty: 3,
        price: 12.99,
        variantImage: 'img/img-hats-peach.jpg',
        variantThumbnail: 'img-thumbnail-peach.jpg',
        details: ["80% cotton", "20% polyester", "Gender-neutral"]
      }
    ],
    socks: [
      {
        variantId: 312,
        name: 'Allie Socks',
        variantStyle:'stars',
        variantQty: 0,
        price: 5.99,
        variantImage: 'img/img-socks-stars.jpg',
        variantThumbnail: 'img-thumbnail-stars.jpg',
        details: ["80% cotton", "20% polyester", "Gender-neutral"]
      }
    ]
  },
  methods: {
    updateCart(obj) {
      this.cart.push(obj)
    },
    removeItem(id) {
      let i = this.cart.lastIndexOf(id) + 2
      this.cart = this.cart.slice(i, 1)
      console.log(this.cart)
    },
    addReview: function (productReview) {
      this.reviews.push(productReview);
    }
  },
  computed: {
    totalCart: function(){
      let total = 0;
      for (let index = 0; index < this.cart.length; index++) {
          const element = this.cart[index];
          total = total + (element.price);
      }
      return total;
    },
    // totalStyle: function(){
    //   let element = []
    //   element = this.cart;
    //   apple = element.lastIndexOf("Koda Shirt (Apple)");
    //   // element[apple];
    //   return apple;
    // }
  }
})