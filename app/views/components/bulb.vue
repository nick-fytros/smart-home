<template>
    <div>
        <div class="columns">
            <div class="column">
                {{ bulb.customName || bulb.name }}
            </div>
        </div>
        <div class="columns">
            <div class="column is-1">
                <a class="button" :class="{'is-warning': isOn,'is-active': isOn}" v-on:click="turnOnOrOff">
                    <span class="icon is-medium">
                        <i class="fa fa-lightbulb-o"></i>
                    </span>
                </a>
            </div>
            <div class="column field is-6">
                <p class="control">
                    <input class="input" type="color" v-model="currentColor" v-on:input="changeColor">
                </p>
            </div>
            <div class="column field is-5">
                <p class="control">
                    <input class="input" type="text" v-model="customName" v-on:change="changeCustomName" placeholder="Name the bulb">
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['bulb'],
    data: function () {
        return {
            isOn: true,
			currentColor: '',
            customName: '',
			timeoutId: 0
		}
    },
    methods: {
        turnOnOrOff: function() {
            if (this.isOn){
                this.currentColor = '#000000';
            }else {
                if (this.bulb.previousColor !== ''){
                    this.currentColor = this.bulb.previousColor
                }else {
                    this.currentColor = '#ffffff'
                }
            }
            this.changeColor();
            this.isOn = !this.isOn;
        },
        changeColor: function() {
            if (this.timeoutId != 0){
                clearTimeout(this.timeoutId);
                this.timeoutId = 0;
            }
            this.timeoutId = setTimeout(() => {
                this.$emit('changecolor', { bulbId: this.bulb.id, color: this.currentColor });
            }, 300);
        },
        changeCustomName: function() {
            this.$emit('changecustomname', { bulbId: this.bulb.id, customName: this.customName });
        }
    },
    mounted: function() {
        this.bulb.color === '' ? this.currentColor = '#ffffff' : this.currentColor = this.bulb.color;
        if (this.currentColor === '#000000') this.isOn = false;
        this.customName = this.bulb.customName;
    }
}

</script>

<style>

</style>