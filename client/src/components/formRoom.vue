<template lang="html">
  <div class="valign-wrapper row login-box">
    <div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
      <form class="col s12">
          <div class="row">
            <div class="input-field col s12">Create Room</div>
            <div class="input-field col s6">
              <table class="centered striped">
        <thead>
          <tr>
              <th>Tempat Futsal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="futsal in place_futsal">
            <td>{{futsal.name}}</td>
            <td><a v-on:click="getDetail(futsal.place_id)" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">menu</i></a></td>
          </tr>
        </tbody>
      </table>
          </div>
            <div class="input-field col s6">
    <p><b>Nama Room</b></p>
            <input v-model="room_name" type="text" >
    <p><b>Tempat Futsal</b></p>
            <input disabled v-model="name_place" type="text" >
    <p><b>Alamat</b></p>
          <textarea disabled v-model="address_place" class="materialize-textarea"></textarea>
    <p><b>No Telfon</b></p>
            <input disabled v-model="phone" type="text" >
    <p><b>Tanggal</b></p>
            <input v-model="date" type="date" class="datepicker">
    <p><b>Waktu</b></p>
              <input v-model="time" class="timepicker" type="time">
            </div>
            <a v-on:click="createRoom" class="btn green waves-effect waves-light">Create Room</a>
          </div>
      </form>
    </div>
  </div>
</template>
<script>


export default {
  name: 'formRoom',
  data() {
    return {
      place_futsal: [''],
      name_place: '',
      address_place: '',
      phone: '',
      cordinate: '',
      time: '',
      date: '',
      place_id: '',
      room_name: '',
      database:''
    }
  },
  methods: {
    seedData() {
      let self = this;
      this.axios.get('http://localhost:3000/maps').then((response) => {
        self.place_futsal = response.data;
      });
    },
    getDetail(id) {
      this.place_id = id;
      let self = this;
      this.axios.post('http://localhost:3000/map', {
        id: id,
      }).then((response) => {
        self.address_place = response.data.formatted_address;
        self.name_place = response.data.name;
        self.phone = response.data.formatted_phone_number;
        self.cordinate = response.data.geometry.location.lat;
        self.cordinate = self.cordinate + ',' + response.data.geometry.location.lng;
      });
    },
    createRoom() {
      let self = this;
      let temp = this.date + " " + this.time + ":00";
      let id = window.localStorage.getItem('id');
      axios.post('http://localhost:3000/matches', {
        name: self.room_name,
        creator: id,
        coordinate: self.cordinate,
        place: self.name_place,
        address: self.address_place,
        phone: self.phone,
        matchTime: temp,
        place_id: self.place_id
      }).then((response) => {
        console.log(response.data._id);
        this.database.ref('room/' + response.data._id).set({
          status: true
        });
        self.$router.push('/home');
      });
    }
  },
  created() {
    console.log('seed');
    this.seedData();
    this.database = firebase.database();
  }
}
</script>

<style lang="css" scoped>
</style>
