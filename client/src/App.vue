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
import ActionButton from './components/ActionButton.vue'
export default {
  name: 'App',
  data() {
    return {
      tripStarted: false,
      routes: [],
      activeTripId: null,
    }
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
    }
  },
  components: { ActionButton }
}
</script>
