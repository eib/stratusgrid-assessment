# Vue 3 Cheatsheet

```
<!-- HelloWorld.vue -->
<template src="./HelloWorld.html"></template>
<script src="./HelloWorld.ts" lang="ts"></script>
<style src="./HelloWorld.css"></style>
```

## Composition API
* has `setup` attribute in the `<script>` element
```
	<script setup>
		import { ref, onMounted } from 'vue'
		const count = ref(0); // reactive state
		function increment() { // mutate state (& trigger updates)
		  count.value++
		};
		onMounted(() => { ... }); // lifecycle hook (factories)
	</script>
	<template>
		<button @click="increment">Count is: {{ count }}</button>
	</template>
```
* `reactive()`
	- Proxies for "normal objects"
	- Only works on Objects, Arrays, Map, Set
* `ref()`
	- works on any value type
	- exposes .value


## Options API
```
<script>
	export default {
		components: {
			ComponentA,
			ComponentB,
		},
		data() {
			return { someData: 0 };
		},
		computed: {
			someComputed() { return this.someData + ... },
		},
		methods: {
			increment() { ... },
		},
		mounted() {
			...
		}
		... other events ...
	}
</script>
<template>
	<button @click="increment">Data = {{ someData }}</button>
</template>
```

## Templates
* Double-mustaches for rendering dynamic text
	- can contain arbitrary JS code...
```
    {{ message }}
    {{  messages.split('').reverse().join('') }}
```
* Dynamic HTML attributes:
```
    <whatever v-bind:$attribute="$property" />
```
	- shorthand:
```
    :$attribute=...
```
* DOM events:
```
		<whatever v-on:$event="$handler" />
```
	- shorthand:
```
    `@$event=...`
```
* Forms (a la 2-way binding):
```
    <input :value="text" @input="onInput">
    ...
    function onInput(e) { // `e` is a native DOM event
        text.value = e.target.value;
    }
```
	- shorthand:
```
    <input v-model="text">
```
		... works on: text, checkboxes, radio buttons, select dropdowns
* Conditional Rendering:
```
    <whatever v-if="$propertyA">...</whatever>
    <whatever v-else-if="$propertyB">...</whatever>
    <whatever v-else>...</whatever>
```
* List Rendering:
```
    <ul>
        <li v-for="item in items" :key="item.id">...</li>
    </ul>
```
	- "key" is a unique identifier to help position elements based on the backing list
	- updating the backing list requires:
		1) mutating methods: e.g. `items.value.push(newItem)`
		2) replacing the `.value`: `items.value = items.value.filter(...)`
* Computed Properties: `.computed()`
	- calculates & caches data (i.e. Knockout)
* DOM screwiness:
```
		<whatever ref=$field />
		...
		const field = ref(null);
		onMounted(() => { pElementRef.value.textContent = ...; });
```
	- `someRef.value` will be the matching DOM element
	- check also: the lifecycle events
* Watchers / Side effects
	- `watch()` tracks changes to a ref, callback is fired when value changes
	- can also watch other types/data sources

### Composition
* Referencing:
	- import the component (.vue file)
	- reference via `<ChildComponent />`
* Sharing data:
	- children components use `defineProps({ ...data... })`
		* N.B. a compile-time macro, so don't import it
	- parents use `v-bind:$field` syntax (or `:$field` shortcut) to pass data
* Emitting events:
	- children emitting events: `defineEmits([...])` and `emit('event-name', data)`
	- parents listen to child events using `v-on:$event=...` (or `@$event=...` shortcut)
* Slots:
	- slots defined in child: `<slot/>` or `<slot>fallback content</slot>`
	- parent passing in content: `<ChildComponent>data</ChildComponent>`

## See also
* https://play.vuejs.org/
* https://vuejs.org/guide/essentials/reactivity-fundamentals.html
* https://vuejs.org/guide/essentials/event-handling.html
* https://vuejs.org/guide/essentials/forms.html
* https://vuejs.org/guide/essentials/conditional.html
* https://vuejs.org/guide/essentials/list.html
* https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram
* https://vuejs.org/guide/essentials/watchers.html
* https://vuejs.org/guide/extras/ways-of-using-vue.html
* https://vuejs.org/guide/extras/composition-api-faq.html
