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
                                            <span> {{ bulb.name }} </a>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child notification">
                            <div class="content">
                                <p class="subtitle">Connected Magic Blue BLE Bulbs</p>
                                <div class="content">
                                    <!-- Content -->
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
            intervalId: 0,
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
                    if (this.intervalId !== 0) {
                        clearInterval(this.intervalId);
                    }
                    //this.intervalId = setInterval(this.fetchBleBulbsDiscovered, 10000);
                    setTimeout(this.fetchBleBulbsDiscovered, 1000);
                }
            }).catch((error) => {
                this._setMessage('error', 'Failed to scan for BLE bulbs');
            });
        },
        fetchBleBulbsDiscovered: function () {
            axios.get(this.config.routes.bleBulbs.discoveredBulbs, {
                params: { _csrf: this.csrfToken }
            }).then((response) => {
                this.loading.scan = false;
                this.bleBulbsFound = response.data.bulbs;
                console.log(this.bleBulbsFound);
            }).catch((error) => {
                this._setMessage('error', 'Failed to fetch BLE bulb data');
                clearInterval(this.intervalId);
            });
        },
        connectToBulb: function (bulbId) {
            this.loading.connect = true;
            axios.post(this.config.routes.bleBulbs.connect, {
                _csrf: this.csrfToken,
                bulbId: bulbId
            }).then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                    this._setMessage('warning', response.data.error);
                } else {
                    console.log(response.data);
                    this.loading.connect = false;
                }
            }).catch((error) => {
                this._setMessage('error', 'Failed to connect to BLE bulb');
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
    beforeDestroy: function () {
        if (this.intervalId !== 0) {
            clearInterval(this.intervalId);
        }
    }
}
</script>
<style>

</style>
