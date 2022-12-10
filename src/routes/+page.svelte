<script lang="ts">
  import Prism from '@magidoc/plugin-svelte-prismjs'
  import 'prismjs/components/prism-python'
  import 'prismjs/themes/prism-twilight.css'

  function updateCode(i) {
    let option = tutorial[currentTopic]['options'][i]
    if ('vars' in option) {
      source = option['code'](option['vars'])
    } else {
      source = option['code']
    }
  }

  let tutorial = {
    '#1': {
      'title': 'Are you going to download one or more CKAN datasets?',
      'code': `
    from frictionless import portals

    ckan_control = portals.CkanControl()
        `,
      'options': [
        {
          'label': 'just one package',
          'code': `
    from frictionless import portals, Package

    ckan_control = portals.CkanControl()
    package = Package(CKAN_DATASET_URL, control=ckan_control)
            `
        },
        {
          'label': 'more than one package',
          'code': (v) => `
    from frictionless import portals, Catalog

    ckan_control = portals.CkanControl()
    catalog = Catalog(` + v[0]['value'] + `, control=ckan_control)
            `,
          'vars':[{'value': 'CKAN_DATASET_URL', 'label': 'CKAN instance URL'}]
        }
      ],
      'next': '#2'
    },
    '#2': {
    }
  } 

  let currentTopic = '#1'  
  let source = tutorial[currentTopic]['code']

</script>

<div class="flex place-content-center">
  <div class="grid grid-cols-2 w-full">
    <div class="pt-10 pl-2 col-span-1 pr-10">
      <h2>{tutorial[currentTopic]['title'] }</h2>
{#each tutorial[currentTopic]['options'] as option,i }
<p on:click="{() => updateCode(i)}">
{option['label']}
</p>
{/each}
  
    
    </div>
    <div class="col-span-1 pr-2">
    
    <Prism 
      class="w-full"
      language={'python'}
      source={source}
      showCopyButton
      showLineNumbers
      />
    </div>
  </div>
</div>
