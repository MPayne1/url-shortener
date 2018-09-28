new Vue({
  el: '#app',
  data: {
    error: '',
    name: '',
    url: '',
    success: false
  },
  methods: {
    createPuny() {
      const body = {
          name: this.name,
          url: this.url
        }
      fetch('/api/puny', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => {
        console.log(response);
        return response.json();
      }).then(result => {
        if(result.isJoi) {
          this.error = result.details.map(detail => detail.message).join('. ');
          console.log(this.error);
        } else {
          this.success = true;
        }
      });
      console.log(this.name, this.url);
    }
  }
})
