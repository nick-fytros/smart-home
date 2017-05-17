<template>
    <div>
        <appheader :title="title"
                   :subtitle="subtitle"></appheader>
        <section class="section content main-section">
            <div class="container">
                <userbar :message="message"
                         :timeout="4000"
                         :user="user"></userbar>
                <div class="tile is-ancestor">
                    <div class="tile is-vertical is-4">
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <article class="tile is-child notification">
                                    <div class="block">
                                        <a v-on:click="scanForMagicBlueBulbs"
                                           class="button is-primary" :class="{'is-loading': loading.scan}">Scan for bulbs</a>
                                    </div>
                                </article>
                                <article class="tile is-child notification">
                                    <p class="subtitle">Discovered Magic Blue BLE Bulbs</p>
                                    <div v-for="bulb in bleBulbsFound" class="content">
                                        <a v-on:click="connectToBulb(bulb.id)" class="button is-primary is-outlined" :class="{'is-loading': loading.connect}" title="Press to connect">
                                            <span class="icon">
                                                <i class="fa fa-bluetooth-b"></i>
                                            </span>
                                            <span> {{ bulb.name }} </span>
                                            <span v-if="bulb.state === 'connected'" class="color-success"> > connected</span>
                                        </a>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child notification">
                            <div class="content">
                                <p class="subtitle">Connected Magic Blue BLE Bulbs</p>
                                <div v-for="bulb in bleBulbsConnected" class="content">
                                    <bulb :bulb="bulb" v-on:changecolor="changeColor"></bulb>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
        <appfooter></appfooter>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            message: {
                text: ''
            },
            bleBulbsFound: [],
            bleBulbsConnected: [],
            loading: {
                scan: false,
                connect: false
            }
        }
    },
    methods: {
        scanForMagicBlueBulbs: function () {
            this.loading.scan = true;
            axios.post(this.config.routes.bleBulbs.scan, {
                _csrf: this.csrfToken
            }).then((response) => {
                if (response.data.error) {
                    this._setMessage('warning', response.data.error);
                } else {
                    setTimeout(this.fetchBleBulbsDiscovered, 500);
                }
            }).catch((error) => {
                this._setMessage('error', 'Failed to scan for BLE bulbs');
            });
        },
        fetchBleBulbsDiscovered: function () {
            axios.get(this.config.routes.bleBulbs.discoveredBulbs).then((response) => {
                this.bleBulbsFound = response.data.bulbs;
            }).catch((error) => {
                this._setMessage('error', 'Failed to fetch BLE bulb data');
            }).then(() => {
                this.loading.scan = false;
                this.loading.connect = false;
            });
        },
        connectToBulb: function (bulbId) {
            this.loading.connect = true;
            axios.post(this.config.routes.bleBulbs.connect, {
                _csrf: this.csrfToken,
                bulbId: bulbId
            }).then((response) => {
                if (response.data.error) {
                    this._setMessage('warning', response.data.error);
                } else {
                    this.bleBulbsConnected = response.data.bulbs;
                }
            }).catch((error) => {
                this._setMessage('error', 'Failed to connect to BLE bulb');
            }).then(() => {
                /* after connecting fetch the available bulbs again */
                this.fetchBleBulbsDiscovered();
            });
        },
        changeColor: function (bulbObj) {
            axios.post(this.config.routes.bleBulbs.changeColor, {
                _csrf: this.csrfToken,
                bulbId: bulbObj.bulbId,
                color: bulbObj.color
            }).then((response) => {
                if (response.data.error) {
                    this._setMessage('warning', response.data.error);
                } else {
                    console.log(response.data);
                }
            }).catch((error) => {
                this._setMessage('error', 'Failed to change bulb color');
            });
        },
        _setMessage: function (status, text) {
            this.message.error = false;
            this.message.success = false;
            this.message.waring = false;
            this.message.info = false;
            this.message[status] = true;
            this.message.text = text;
        }
    },
    mounted: function(){
        this.bleBulbsConnected = this.connectedBubls;
    },
    beforeDestroy: function () {
    }
}
</script>
<style>
.color-success{
    color: seagreen;
    padding-left: 4px; 
}
</style>
