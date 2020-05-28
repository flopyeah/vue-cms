<template>
  <div class="side-left">
    <div class="header">
      <div class="logo">MoocUp</div>
    </div>
    <div class="search">
      <b-input-group>
        <b-form-input></b-form-input>

        <template v-slot:append>
          <b-dropdown text="Rechercher" variant="success">
            <b-dropdown-item>Action A</b-dropdown-item>
            <b-dropdown-item>Action B</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-input-group>
    </div>
    <div class="item">
      <ul class="item-menu-ul">
        <li class="item-menu-li"><router-link class="nav-link" :to="{name: 'Dashboard'}" exact><fa-icon icon="pager" />Dashboard</router-link></li>
        <li class="item-menu-li"><router-link class="nav-link" :to="{name: 'ArticlesList'}" ><fa-icon icon="file-invoice" />Articles</router-link></li>
        <li class="item-menu-li"><router-link class="nav-link" :to="{name: 'CategoryList'}" ><fa-icon icon="tags" />Categories</router-link></li>
        <!--<li class="item-menu-li"><router-link class="nav-link" :to="{name: 'TagList'}" ><fa-icon icon="hashtag" />Tags</router-link></li>-->
        <li class="item-menu-li"><router-link class="nav-link" :to="{name: 'MediasList'}"><fa-icon icon="images" ></fa-icon>Medias</router-link></li>
        <li class="item-menu-li"><router-link class="nav-link" :to="{name: 'UsersList'}"><fa-icon icon="users" />Utilisateurs</router-link></li>
        <li class="item-menu-li"><router-link class="nav-link" :to="{name: 'Parametre'}"><fa-icon icon="cog" />Paramètres</router-link></li>
        <li class="item-menu-li"><a><fa-icon icon="sign-out-alt" />Logout</a></li>
        <li class="item-menu-li"><router-link class="nav-link" :to="{name: 'Login'}"><fa-icon icon="unlock-alt" />Login</router-link></li>
        <slot name="side-left"/>
      </ul>
    </div>
    <div class="footer">
      <fa-icon icon="user" /> beta 0.1
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftSide'
}
</script>
