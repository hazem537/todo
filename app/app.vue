<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Simple Todo App
      </h1>
      
      <!-- Add Todo Form -->
      <form @submit.prevent="addTodo" class="mb-6">
        <div class="flex gap-2">
          <input
            v-model="newTodo"
            type="text"
            placeholder="Add a new todo..."
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="loading"
          />
          <button 
            type="submit" 
            :disabled="!newTodo.trim() || loading"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Adding...' : 'Add' }}
          </button>
        </div>
      </form>

      <!-- Todo List -->
      <div class="space-y-2">
        <div 
          v-for="todo in todos" 
          :key="todo.id"
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
        >
          <input 
            type="checkbox" 
            :checked="todo.done"
            @change="toggleTodo(todo)"
            class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            :disabled="loading"
          />
          
          <span 
            :class="[
              'flex-1',
              todo.done ? 'line-through text-gray-500' : 'text-gray-800'
            ]"
          >
            {{ todo.text }}
          </span>
          
          <button 
            @click="deleteTodo(todo.id)"
            :disabled="loading"
            class="text-red-500 hover:text-red-700 disabled:text-gray-400"
          >
            ✕
          </button>
        </div>
        
        <div v-if="todos.length === 0" class="text-center text-gray-500 py-8">
          No todos yet. Add one above!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const todos = ref([])
const newTodo = ref('')
const loading = ref(false)

// Fetch todos on page load
onMounted(() => {
  fetchTodos()
})

// Fetch all todos
async function fetchTodos() {
  try {
    const data = await $fetch('/api/todos')
    todos.value = data
  } catch (error) {
    console.error('Failed to fetch todos:', error)
  }
}

// Add new todo
async function addTodo() {
  if (!newTodo.value.trim()) return
  
  loading.value = true
  try {
    const todo = await $fetch('/api/todos', {
      method: 'POST',
      body: { text: newTodo.value }
    })
    todos.value.unshift(todo)
    newTodo.value = ''
  } catch (error) {
    console.error('Failed to add todo:', error)
  } finally {
    loading.value = false
  }
}

// Toggle todo completion
async function toggleTodo(todo) {
  loading.value = true
  try {
    await $fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      body: { done: !todo.done }
    })
    todo.done = !todo.done
  } catch (error) {
    console.error('Failed to update todo:', error)
  } finally {
    loading.value = false
  }
}

// Delete todo
async function deleteTodo(id) {
  loading.value = true
  try {
    await $fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    })
    todos.value = todos.value.filter(todo => todo.id !== id)
  } catch (error) {
    console.error('Failed to delete todo:', error)
  } finally {
    loading.value = false
  }
}
</script>
