
  <template>
    <div class="container">
        <div class="row">
            <div v-for="(product, index) in products" 
                 :key="'product-' + index" 
                 class="col-md-4">
                <div class="card mb-3">
                    <img :src="product.photoURL" 
                         class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ product.name }}
                        </h5>
                        <p class="card-text">
                            {{ product.description }}
                        </p>
                        <div class="d-grid">
                            <button @click="addToCart(product)" 
                                    class="btn btn-outline-primary">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ShoppingCart v-model="shoppingCart"/>
        </div>
    </div>
</template>

<script>


export default {
    
    data() {
      return {
        shoppingCart: [],
        products: [
          {
                    uuid: '5b9ed8b5-201e-4297-babb-29a566952e91',
                    name: 'Spice Oil with Fennel', 
                    description: 'Flavoured with a few bits of fennel, laurel leaves and chilli pepper', 
                    price: 15,
                    photoURL: 'https://www.seeds-gallery.eu/7651-large_default/fennel-seed-sweet-fennel-fenkel.jpg'
                },
                { 
                    uuid: '973b3d42-e039-428a-b2ad-e6444b5895f4',
                    name: 'Spice Oil with Rosemary', 
                    description: 'Flavoured with rosemary, thyme leaves and pepper', 
                    price: 13,
                    photoURL: 'https://www.ventos.com/images/stories/02035002.jpg'
                },
                {
                    uuid: '33d3332e-42ac-4692-8523-ae76c3d8a773',
                    name: 'Spice Oil with Oregano', 
                    description: 'Flavoured with cumin and oregano', 
                    price: 16,
                    photoURL: 'https://candidiasisweb.com/img/remedios/antifungicos/naturales/oregano.png'
                },
                { 
                    uuid: 'c70080cd-330f-4398-b169-03f057582e2a',
                    name: 'Spice Oil with Tyme', 
                    description: 'Only a little bit spice with Tyme', 
                    price: 12,
                    photoURL: 'https://www.hoytapeo.com/wp-content/uploads/2020/11/aceite-picante-receta-1024x682.jpg'
                }
        ]
      }
      },
      mounted(){
        this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || "[]")
      },
       watch: {
        shoppingCart: {
            handler(newValue) {
                localStorage.setItem('shoppingCart', JSON.stringify(newValue));
            }, deep: true
        }
    },
    methods: {
        addToCart(product) {
            let exists = false;
            
            for (const cartItem of this.shoppingCart) {
                if (cartItem.uuid === product.uuid) {
                    cartItem.amount = cartItem.amount + 1;
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                this.shoppingCart.push({
                    ...product,
                    amount: 1,
                })
            }
        },
    }
}
</script>