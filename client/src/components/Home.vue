<template lang="html">
  <div class="Home">
    <div class="row" v-for="(match,index) in listmatch">
      <div class="col s12 m4 l2" ></div>
      <div class="col s12 m4 l10">
        <div class="row">
        <div class="col s12 m6">
          <div class="card teal darken-1">
            <div class="card-content white-text">
              <span class="card-title">{{match.name}}</span>
              <div class="left-align">
                <p>{{match.place}}</p>
                <p>{{match.address}}</p>
                <p>{{match.phone}}</p>
                <p>{{match.matchTime}}</p>
                <p>avaible : {{match.openStatus}}</p>
              </div>
            </div>
            <div v-if="match.openStatus">
              <div class="card-action">
                <a href="javascript:void(0)" @click="challangeTeam(match._id,index)" >Challange this team</a>
              </div>
            </div>
            <div v-else>
                <a href="javascript:void(0)" >Booked</a>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="col s12 m4 l2"></div>
    </div>
  </div>

</template>

<script>
export default {
  name:'home',
  data(){
    return {
      listmatch:[]
    }
  },
  methods:{
    getlistmatch() {
        var self = this
        this.axios.get('http://localhost:3000/matches', {

        }).then(function(response) {
          console.log(response.data);
            self.listmatch = response.data
            console.log(self.listBlogs);
        })
    },
    challangeTeam(idmatch,index){
      var self = this
      console.log(idmatch);
      console.log(self.listmatch);
      console.log(index);
      self.listmatch[index].openStatus=false;
      let userid = window.localStorage.getItem('id')
      this.axios.put(`http://localhost:3000/matching/${idmatch}`, {
        userId : userid
      }).then(function(response) {
        console.log(response);

    })
  }
},
  created(){
    
        this.getlistmatch()
  }


}
</script>

<style lang="css">

</style>
