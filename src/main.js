import './style.css'
import { AuthInvalidCredentialsError, createClient } from '@supabase/supabase-js'

class Home {
  constructor() {
    this.initSupabase()
    this.cacheDOM()
    this.getData()
  }

  // Create a single supabase client for interacting with your database
  initSupabase() {
    this.supabase = createClient('https://ewrhahqwkllicskwljqe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3cmhhaHF3a2xsaWNza3dsanFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTkwMzIsImV4cCI6MjA2MTQ5NTAzMn0.M_VzYb48IqXdZPz7sK2nztl5mBf8TgfH3xqLZ78Rftc')
  }

  async getData() {
    const { data } = await this.supabase
      .from('publication')
      .select(`date,
        price,
        url,
        title,
        users(
        username
        ),
        artist(
        artist_name)
        `)
        console.log(data)
        this.createCards(data)
  }

  createCards(data){
    data.forEach(post => {
      console.log(post)
      const li = document.createElement("li");
      const img = document.createElement("img");
      const h3 = document.createElement("h3");
      const pArtist = document.createElement("h3");
      const pUsername = document.createElement("p");
      const pPrice = document.createElement("p");
      img.src = post.url
      h3.textContent = post.title
      pArtist.textContent = post.artist.artist_name
      pUsername.textContent = post.users.username
      pPrice.textContent = post.price

      this.appendCustom(li, [img, h3, pArtist, pUsername, pPrice])

      this.container.appendChild(li)

      console.log(li)
    })
  }

  appendCustom(parent, children){
    children.forEach(child =>
      parent.appendChild(child)
    )
  }

  cacheDOM(){
    this.container = document.querySelector("#container");
  }
}

new Home()


