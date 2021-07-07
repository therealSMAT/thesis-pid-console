<template>
  <div id="app" class="container">
      <div class="min-h-screen bg-white">
        <div class="py-10">
          <header>
            <div class="flex items-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-x-2">
              <h1 class="text-3xl font-bold leading-tight text-gray-900">Operator Console</h1>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="tripDetailClass">
                {{ tripDetails }}
              </span>
            </div>
            <div class="flex items-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-x-2 mt-2" v-if="tripStarted">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>Lat: {{ location.lat }}, Long: {{ location.long }}  </p>
              </div>
          </header>
          <main>
            <div class="max-w-2xl mx-auto sm:px-6 lg:px-2">
              <div class="px-4 py-8 sm:px-0">
                <div class="border-4 border-dashed border-gray-200 rounded-lg h-auto p-4">
                  <div class="grid xs:grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
                    <ActionButton @click="startTrip" v-if="!tripStarted">Start Trip</ActionButton>
                    <ActionButton @click.prevent="stopTrip" v-if="tripStarted">End Trip</ActionButton>
                  </div>
                </div>
              </div>
            </div>

            <div class="max-w-2xl mx-auto sm:px-6 lg:px-2">
              <div class="px-4 py-8 sm:px-0">
                <div class="border-4 border-dashed border-gray-200 rounded-lg h-auto p-4">
                  <div class="grid xs:grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
                    <ActionButton v-for="{ location_name: location, tripId } in routes"
                     :key="location" @click="setActiveRoute(tripId)"
                      :class="{ 'border-8 border-green-500 bg-green-500 text-gray-100': tripId === activeTripId }">
                      {{ location }}
                    </ActionButton>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  </div>
</template>

<script>
import mqtt from 'mqtt';
import ActionButton from './components/ActionButton.vue';

export default {
  name: 'App',
  data() {
    return {
      tripStarted: false,
      routes: [],
      activeTripId: null,
      location: {
        lat: null,
        long: null
      }
    }
  },
  mounted() {
    this.createConnection();
  },
  computed: {
    tripDetails() {
      return this.tripStarted ? 'Trip running' : 'Trip not started';
    },
    tripTheme() {
      return this.tripStarted ? 'green' : 'red';
    },
    tripDetailClass() {
      return `bg-${this.tripTheme}-100 text-${this.tripTheme}-800`;
    },
    clientId() {
      return 'mqttjs_' + Math.random().toString(16).substr(2, 8)
    },
  },
  methods: {
    async startTrip() {
      this.tripStarted = true;
      const { data: { routes } } = await this.$http.get('/start-trip');
      this.routes = routes.data;
    },
    async stopTrip() {
      this.tripStarted = false;
      await this.$http.get('/stop-trip');
      this.routes = [];
      this.activeTripId = null;
    },
    async setActiveRoute(tripId) {
      this.activeTripId = tripId;
      await this.$http.get(`/set-bus-stop?routeId=${tripId}`);
    },
    createConnection() {
      this.client = mqtt.connect(process.env.VUE_APP_MQTT_BROKER, { clientId: this.clientId });
      this.subscribeToTopics();
      this.handleErrors();
      this.waitForMessages();
    },
    handleErrors() {
      this.client.on("error", (err) => {
        console.log("Connection error: ", err);
        this.client.end();
      });
    },
    subscribeToTopics() {
      this.client.on("connect", () => {
        this.client.subscribe("transport/location");
        console.log("Subscribed successfully!");
      });
    },
    waitForMessages() {
      this.client.on("message", (topic, message) => {
        if (topic === "transport/location") {
          let location = JSON.parse(message.toString());
          this.$set(this, "location", location);
        }
      });
    },
  },
  components: { ActionButton }
}
</script>
