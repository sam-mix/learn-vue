var app = new Vue({
    el: '#app',
    data: {
        list: [
            {
                id : 1,
                name: 'iPhone 7',
                price: 6188,
                count: 1,
            },
            {
                id : 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1,
            },
            {
                id : 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1,
            },
        ]
    },
    computed: {
        totalPrice: function() {
            var totalPrice = 0
            for (let i = 0; i < this.list.length; i++) {
                const e = this.list[i];
                totalPrice += e.price * e.count
            }
            return totalPrice.toString().replace(/\B(?=(\d{3})+$)/g, ',')
        }
    },
    methods: {
        handleReduce: function(i) {
            if (this.list[i].count === 1) return
            this.list[i].count --
        },

        handleAdd: function(i) {
            this.list[i].count ++
        },

        handleRemove: function(i) {
            this.list.splice(i, 1)
        },
    }
})