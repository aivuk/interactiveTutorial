<script lang="ts">
  import '../app.css'

  export const prerender = true;
  export const ssr = false;
  export const trailingSlash = 'ignore';
</script>

<main>
<slot/>
</main>
