function isValueNumber(val) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'');
}

Vue.component('input-number', {
    template:'\
    <div class="input-number">\
        <input type="text" :value="currentValue" @change="handleChange">\
        <button @click="handleDown" :disabled="currentValue <= min">-</button>\
        <button @click="handleUp" :disabled="currentValue >= max">+</button>\
    </div>\
    ',
    props: {
        max: {
            type: Number,
            default: Infinity,
        },
        min: {
            type: Number,
            default: -Infinity,
        },
        value: {
            type: Number,
            default: 0,
        },
    },
    data: function() {
        return {
            currentValue: this.value,
        }
    },
    watch: {
        currentValue: function(val) {
            this.$emit('input', val)
            this.$emit('on-change', val)
        },
        value: function(val) {
            this.updateValue(val)
        },
    },

    methods: {
        handleDown: function() {
            if (this.currentValue <= this.min) return
            this.currentValue --
        },

        handleUp: function() {
            if (this.currentValue >= this.max) return
            this.currentValue ++
        },

        updateValue: function(val) {
            if (val > this.max) val = this.max
            if (val < this.min) val = this.min
            this.currentValue = val
        },
        handleChange: function(event) {
            var val = event.target.value.trim()

            if (isValueNumber(val)) {
                val = Number(val)
                this.currentValue = val
                if (val > this.max) {
                    val = this.max
                } else if(val < this.min) {
                    val = this.min
                }
            } else {
                event.target.value = this.currentValue
            }
        }
    },

    mounted: function() {
        this.updateValue(this.value)
    }
})