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
                                    <!--<p class="title">Vertical...</p>-->
                                    <div class="block">
                                        <a v-on:click="scanForMagicBlueBulbs"
                                           class="button is-primary">Scan and connect</a>
                                    </div>
                                </article>
                                <article class="tile is-child notification">
                                    <p class="title">Magic Blue BLE Bulbs</p>
                                    <p class="subtitle">
                                        <ul id="example-1">
                                            <li v-for="bulb in bleBulbsFound">
                                                {{ bulb.name }}
                                            </li>
                                        </ul>
                                    </p>
                                </article>
                            </div>
                        </div>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child notification">
                            <div class="content">
                                <p class="title">Tall tile</p>
                                <p class="subtitle">With even more content</p>
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
            intervalId: 0
        }
    },
    methods: {
        scanForMagicBlueBulbs: function () {
            axios.post(this.config.routes.bleBulbs.scanAndConnect, {
                _csrf: this.csrfToken
            }).then((response) => {
                if (response.data.error) {
                    this._setMessage('warning', response.data.error);
                } else {
                    if (this.intervalId !== 0) {
                        clearInterval(this.intervalId);
                    }
                    this.intervalId = setInterval(this.fetchBleBulbsDiscovered, 10000);
                }
            }).catch((error) => {
                this._setMessage('error', 'Failed to scan for BLE bulbs');
            });
        },
        fetchBleBulbsDiscovered: function () {
            axios.get(this.config.routes.bleBulbs.discoveredBulbs, {
                params: { _csrf: this.csrfToken }
            }).then((response) => {
                this.bleBulbsFound = response.data.bulbs;
            }).catch((error) => {
                this._setMessage('error', 'Failed to fetch BLE bulb data');
                clearInterval(this.intervalId);
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
        clearInterval(this.intervalId);
    }
}
</script>
<style>

</style>
