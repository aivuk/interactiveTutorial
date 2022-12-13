<script lang="ts">
  import Prism from '@magidoc/plugin-svelte-prismjs'
  import 'prismjs/components/prism-python'
  import 'prismjs/themes/prism-twilight.css'

  function updateCode(i) {
    currentOption = i
    let option = tutorial[currentTopic]['options'][i]
    if ('vars' in option) {
      source = option['code'](option['vars'])
    } else {
      source = option['code']
    }
  }

  function updateValue(evt, option, v) {
    let voption = tutorial[currentTopic]['options'][option]
    if ('type' in voption['vars'][v]) {
      if (voption['vars'][v]['type'] == 'check') {
        voption['vars'][v]['state'] = evt.target.checked
      }
    } else {
      voption['vars'][v]['value'] = evt.target.value
    }
    source = voption['code'](voption['vars'])
  }

  function getValue(variable) {
    if ('type' in variable) {
      if (variable['type'] == 'check') {
        return variable['state']?variable['value']:''
      }
    } else {
      if (variable['value'] == '') {
        return variable['placeholder']
      } else {
        return variable['value']
      }
    }
  }

  let state = ['#1', 0]

  let tutorial = {
    '#1': {
      'title': 'Are you going to download one or more CKAN datasets?',
      'description': 'First thing to do, choose if you know already if you are going to download multiple datasets from a CKAN instance or just one individual package.',
      'code': `
    from frictionless import portals

    ckan_control = portals.CkanControl()
        `,
      'options': [
        {
          'label': 'You want to import just one package.',
          'code': (v) => `
    from frictionless import portals, Package

    ckan_control = portals.CkanControl()
    package = Package("` + getValue(v[0]) + `", control=ckan_control)
            `,
          'vars':[{'value': '', 'placeholder': 'CKAN_DATASET_URL', 'label': 'CKAN dataset URL'}]
        },
        {
          'label': 'You want to import more than one package.',
          'code': (v) => `
    from frictionless import portals, Catalog

    ckan_control = portals.CkanControl(baseurl="` + getValue(v[0]) + '"' + getValue(v[1]) + `)
    catalog = Catalog(control=ckan_control)
            `,
          'vars':[
            {'value': '', 'placeholder': 'CKAN_INSTANCE_URL', 'label': 'CKAN instance URL'},
            {'type': 'check', 'value': ',\n                     ignore_package_errors=True', 'state': false, 'label': 'Do you want to ignore package errors?'}
          ]
        }
      ],
      'next': '#2'
    },
    '#2': {
    }
  } 

  let currentTopic = '#1'  
  let currentOption = 0
  let source = tutorial[currentTopic]['code']

  updateCode(currentOption)
</script>

  <div class="grid md:grid-cols-2 p-10 grid-rows-2 w-full h-full">
    <div class="pt-2 pl-2 md:col-span-1 pr-10 h-1/2">
      <h1 class="text-2xl mb-5">Frictionless CKAN Data Portal</h1>
      <h2 class="text-lg">{tutorial[currentTopic]['title'] }</h2>
      <div class="p-2">
      {tutorial[currentTopic]['description']}
      </div>
      {#each tutorial[currentTopic]['options'] as option,i }
        <div on:click="{() => updateCode(i)}" class="{ (currentOption == i)? 'ring ring-2 ring-inset rounded rounded-2 p-2 bg-amber-300':'p-2 hover:ring hover:ring-2 hover:ring-inset hover:rounded p-2 hover:bg-sky-100' }" > 
        {option['label']}
          {#if currentOption == i}
            {#if 'vars' in option}
              <div class="pl-4">
                {#each option['vars'] as v, vi}
                  {#if !('type' in v)}
                <div>
                <b>{v['label']}:</b> <input type="text" class="w-full border border-2" placeholder={v['placeholder']} value={v['value']} on:input={(evt) => updateValue(evt, i, vi)}>
                </div>
                  {:else}
                 <div>
                 <b>{v['label']}:</b> <input type="checkbox" bind:checked={v['state']} on:change={(evt) => updateValue(evt, i, vi)}>
                </div>
                  {/if}
                {/each}
              </div>
            {/if}
          {/if}
        </div>
      {/each}
    </div>
    <div class="md:col-span-1 pr-2 h-1/2">
    
    <Prism 
      class="w-full"
      language={'python'}
      source={source}
      showCopyButton
      />
    </div>
  </div>
