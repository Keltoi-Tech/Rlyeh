# Doom: Virtual DOM Implementation for Cthulhu Architecture

## Overview

### Cthulhu Architecture

Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn

Cthulhu is a transcendental intergalactic Design Pattern that provides an elegant way to write node architecture-based applications. It's relies on a self structure building principle that allows deep node structures to be recursively composed as objects.

**Core Principles:**
- **Node-based Architecture**: Applications are built as interconnected nodes
- **Clean Separation**: Clear boundaries between different concerns
- **Modular Design**: Components that can be easily composed and reused
- **State Management**: Each node manages its own state and lifecycle
- **Deep Node Nesting**: Allows for unlimited nesting depth


### Doom: Cthulhu's Virtual DOM Implementation

Doom (Document Object Oriented Model) is a sophisticated Virtual DOM implementation that extends the Cthulhu architecture to provide efficient DOM manipulation for web applications. It allows developers to build rich, interactive web applications using pure JavaScript without traditional HTML templates. Instead of introducing an additional HTML transpilation layer, Cthulhu-Rlyeh allows you to directly manipulate the doom. This approach eliminates the need for an intermediate step of transpiling HTML, resulting in a more streamlined and efficient process. 

**Why Doom?**
- **Pure JavaScript**: No HTML files or templates required
- **Performance**: Efficient Virtual DOM with smart reconciliation
- **Architecture**: Built on Cthulhu Node patterns, allowing independent state management
- **Flexibility**: Component-based approach for complex applications

## Core Concepts

### Virtual DOM Principles

A Virtual DOM that maintains a virtual representation of the actual DOM. This allows for:

- **Efficient Updates**: Only changed parts of the DOM are updated
- **Performance Optimization**: Minimizes expensive DOM operations
- **Declarative API**: Describe what you want, not how to achieve it
- **Cross-browser Compatibility**: Abstracts browser differences

### Reconciliation Process

Doom uses a sophisticated reconciliation algorithm to efficiently update the DOM:

1. **State Comparison**: Compares old and new virtual DOM states
2. **Diff Calculation**: Identifies minimal changes needed
3. **Batch Updates**: Applies changes in optimal batches
4. **Garbage Collection**: Cleans up removed elements automatically

### Component Lifecycle

Doom tracks component states throughout their lifecycle:

- **Virgin State**: Component has never been built
- **Rendered State**: Component is currently in the doom, but never rendered on DOM
- **Deleted State**: Component marked for removal
- **Root State**: Component serves as a root element

### State Management

Doom provides several state management features:

- **Deep Cloning**: Preserves state through updates
- **Immutable Updates**: Ensures predictable state changes
- **Event Handling**: Managed event listeners with cleanup
- **Style Management**: Dynamic CSS style updates

## API Documentation

### Static Methods

#### `Doom.$(tag, properties)`

Creates a new Doom instance and builds it as a root element.

```javascript
const element = await Doom.$('div', {
    content: 'Hello World',
    attributes: { id: 'my-element' },
    styleProps: { color: 'blue' }
});
```

**Parameters:**
- `tag` (string): HTML tag name
- `properties` (object): Element properties

**Returns:** Promise resolving to Doom instance

### Instance Methods

#### `build(tag, update)`

Creates or updates a DOM element. This is the core method for DOM construction.

```javascript
const doom = new Doom({
    content: 'Dynamic content',
    events: {
        click: [handler1, handler2]
    }
});

await doom.build('div');
```

**Parameters:**
- `tag` (string|null): HTML tag name or null for existing element
- `update` (boolean): Whether this is an update operation

**Returns:** Promise resolving to this Doom instance

#### `renderOn(parent)`

Renders the element into a parent DOM element.

```javascript
const parent = document.getElementById('container');
doom.renderOn(parent);
```

**Parameters:**
- `parent` (HTMLElement): Parent element to render into

#### `removeFrom(parent)`

Removes the element from a parent DOM element.

```javascript
doom.removeFrom(parent);
```

**Parameters:**
- `parent` (HTMLElement): Parent element to remove from

#### `delete()`

Marks the element for deletion and removes it from the DOM.

```javascript
doom.delete();
```

### Properties & Getters

#### `root`

Indicates if the element is a root element.

```javascript
doom.root = true; // Mark as root
```

#### `isRendered`

Returns true if the element has been rendered to the DOM.

```javascript
if (doom.isRendered) {
    console.log('Element is in the DOM');
}
```

#### `isVirgin`

Returns true if the element has never been built.

```javascript
if (doom.isVirgin) {
    console.log('Element has never been built');
}
```

#### `isDeleted`

Returns true if the element has been marked for deletion.

```javascript
if (doom.isDeleted) {
    console.log('Element is marked for deletion');
}
```

## Usage Examples

### Basic Element Creation

```javascript
import { Doom } from './doom.js';

// Create a simple div element
const element = await Doom.$('div', {
    content: 'Hello, World!',
    attributes: {
        id: 'greeting',
        className: 'text-center'
    },
    styleProps: {
        color: 'blue',
        fontSize: '24px'
    }
});

// Render to page
element.renderOn(document.body);
```


### Nested Components

```javascript
const app = await Doom.$('div', {
    header: {
        content: 'My Application',
        styleProps: { fontSize: '32px', fontWeight: 'bold' }
    },
    content: {
        content: 'Welcome to my app!',
        styleProps: { padding: '20px' }
    },
    footer: {
        content: '© 2023 My App',
        styleProps: { textAlign: 'center', color: '#666' }
    }
});

app.renderOn(document.body);
```

### Style Properties (styleProps)

```javascript
const div = await Doom.$('div', {
    styleProps: {
        color: 'blue',
        fontSize: '16px',
        padding: '10px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'center'
    }
});

```

### Attributes Structure

```javascript
const range = await Doom.$('input',{
    attributes:{
        type:'number',
        min:0,
        max:100
    }
})

range.renderOn(document.body)
```

### Event Handling

```javascript
const button = await Doom.$('button', {
    content: 'Click me',
    events: {
        click: [
            (e) => console.log('Button clicked'),
            (e) => alert('Hello from Doom!')
        ]
    },
    styleProps: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
    }
});

button.renderOn(document.body);
```

### Dynamic Lists

```javascript
const items = ['Apple', 'Banana', 'Cherry'];

const list = await Doom.$('ul', {
    items: items.map((item, index) => ({
        content: item,
        styleProps: {
            padding: '8px',
            borderBottom: '1px solid #eee'
        }
    }))
});

list.renderOn(document.body);
```

### SVG Support

```javascript
const svg = await Doom.$('svg', {
    nsuri: 'http://www.w3.org/2000/svg',
    width: 200,
    height: 200,
    circle: {
        cx: 100,
        cy: 100,
        r: 50,
        fill: 'blue'
    }
});

svg.renderOn(document.body);
```

## Advanced Features

### AI Comment Support

Doom supports AI comments for debugging and documentation. Helps AI to analyze document structure and provide better insights building or 
testing components via AI:

```javascript
const element = await Doom.$('div', {
    ai: 'This is a container element for user interface',
    content: 'Main content area'
});
```

### Style Management

Dynamic style updates with automatic cleanup:

```javascript
const element = await Doom.$('div', {
    styleProps: { color: 'red' }
});

// Update styles later
element.styleProps = { color: 'blue', fontSize: '16px' };
await element.build();
```

### Event Management

Automatic event listener management:

```javascript
const element = await Doom.$('div', {
    events: {
        click: [handler1, handler2],
        mouseover: [hoverHandler]
    }
});

// Events are automatically cleaned up when element is deleted
element.delete();
```

## Best Practices

### Component Composition

Build complex UIs by composing smaller components:

```javascript
// Create reusable components
const Button = (text, onClick) => Doom.$('button', {
    content: text,
    events: { click: [onClick] }
});

const Card = (title, content) => Doom.$(
    naming(Card), 
    {
        attributes:{
            class:'card'
        },
        header: { content: title },
        body: { content: content }
    });

// Compose them together
const app = await Doom.$('div', {
    button: await Button('Click Me', handleClick),
    card: await Card('Title', 'Content')
});

//Or compose them asynchornous
const [button,card] = await Promise.all([
    Button('Click Me',handleClick),
    Card('Title','Content')
])

const app = await Doom$('div',{
    button,
    card
})
```

### State Management

Use Doom's state tracking for predictable updates and compose complex beaviour components:

```javascript
class Counter {
    constructor() {
        this.count = 0;
        this.element = null;
    }

    async create() {
        this.element = await Doom.$('div', {
            content: `Count: ${this.count}`,
            events: {
                click: [() => this.increment()]
            }
        });
        return this.element;
    }

    async increment() {
        this.count++;
        this.element.content = `Count: ${this.count}`;
        await this.element.build();
    }
}
```

### Performance Considerations

- **Batch Updates**: Group multiple changes together
- **Avoid Deep Nesting**: Keep component hierarchies reasonable
- **Use Virtual DOM**: Let Doom handle DOM updates efficiently
- **Clean Up Events**: Always remove event listeners when done

## Integration

### With Existing Projects

Doom can be integrated into existing projects:

```javascript
// Import Doom
import { Doom } from 'cthulhu-rlyeh';

// Use alongside existing code
const existingElement = document.getElementById('existing');
const doomElement = await Doom.$('div', { content: 'New content' });
doomElement.renderOn(existingElement);
```

### Migration from Traditional DOM

Migrate from traditional DOM manipulation:

```javascript
// Before: Direct DOM manipulation
const element = document.createElement('div');
element.innerHTML = 'Content';
element.style.color = 'red';
document.body.appendChild(element);

// After: Doom approach
const element = await Doom.$('div', {
    content: 'Content',
    styleProps: { color: 'red' }
});
element.renderOn(document.body);
```

### Testing Strategies

```javascript
// Unit testing with Doom
describe('Doom Component', () => {
    it('should create element with correct content', async () => {
        const element = await Doom.$('div', { content: 'Test' });
        expect(element.content).toBe('Test');
    });

    it('should handle events correctly', async () => {
        let clicked = false;
        const element = await Doom.$('button', {
            events: { click: [() => clicked = true] }
        });
        
        element.#self.click();
        expect(clicked).toBe(true);
    });
});
```

## use.js Module

The use.js module provides utility functions for managing Doom instances with enhanced lifecycle and reactive capabilities.

### Key Benefits
- Chainable API for better code readability
- Automatic cleanup of DOM elements
- Integration with reactive state management
- Simplified component operations

### Core Components
- **NodeWrapper**: Enhanced wrapper for Doom instances
- **use()**: Factory function for creating wrappers

### NodeWrapper Class

Wraps Doom instances to provide enhanced management capabilities.

#### Constructor
```javascript
new NodeWrapper(node)
```
Creates a wrapper around a Doom instance.

#### Methods

##### `clean(child)`
Removes a child node from the wrapped node.

```javascript
use(component)
    .clean(child => child.eventListeners);
```

##### `cleanMany(children)`
Removes multiple child nodes.

```javascript
use(component)
    .cleanMany(children => children.subComponents);
```

##### `update(change)`
Applies updates to the wrapped node.

```javascript
use(component)
    .update(n => n.content = 'New content');
```

##### `conciliate()`
Synchronizes with the reactive system.

```javascript
use(component)
    .conciliate();
```

### Usage Examples

#### Basic Component Management
```javascript
import { use } from './use.js';

// Create and manage a component
const component = await Doom.$('div', { content: 'Hello' });
use(component)
    .update(n => n.content = 'Updated')
    .conciliate();
```

#### Event Cleanup
```javascript
// Clean up event listeners
use(component)
    .clean(child => child.clickListeners)
    .conciliate();
```

#### Batch Operations
```javascript
// Multiple operations in sequence
use(component)
    .cleanMany(children => children.allChildren)
    .update(n => n.styleProps.color = 'blue')
    .conciliate();
```

### Quick Reference

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `clean()` | `child` (function) | NodeWrapper | Removes a child node |
| `cleanMany()` | `children` (function) | NodeWrapper | Removes multiple child nodes |
| `update()` | `change` (function) | NodeWrapper | Applies updates |
| `conciliate()` | - | Promise | Syncs with reactive system |

### Factory Function

```javascript
use(node)
```
Creates a new NodeWrapper instance for the given Doom node.

## Router System

The router.js and router-slot.js modules provide a complete client-side routing solution for single-page applications (SPAs) built with Cthulhu-Rlyeh.

### Router Class

The Router class handles URL-based routing with support for dynamic parameters, query strings, and browser history management.

#### Static App Method

```javascript
Router.App({
    app: () => {},
    service: {}
});
```

**Parameters:**
- `app`: Main application component function
- `service`: Service object for dependency injection

**Example:**
```javascript
Router.App({
    app: (service) => {
        return Doom.$('div', {
            content: 'Welcome to the app!',
            styleProps: { padding: '20px' }
        });
    },
    service: {
        apiEndpoint: 'https://api.example.com'
    }
});
```

#### Constructor

```javascript
new Router(routes, service)
```

**Parameters:**
- `routes`: Object mapping URL patterns to route handlers
- `service`: Service object for dependency injection

**Example:**
```javascript
const router = new Router({
    '/': (service) => homePage(service),
    '/users/:id': (service) => userProfile(service),
    '/about': (service) => aboutPage(service)
}, {
    apiEndpoint: 'https://api.example.com'
});
```

#### Route Matching

The router supports dynamic URL parameters and query strings:

```javascript
// Dynamic parameters
const router = new Router({
    '/user/:id': (service) => {
        const { params } = service;
        return Doom.$('div', {
            content: `User ID: ${params.id}`
        });
    },
    '/product/:category/:id': (service) => {
        const { params } = service;
        return Doom.$('div', {
            content: `Category: ${params.category}, ID: ${params.id}`
        });
    }
});
```

#### Query String Handling

```javascript
// Query parameters
const router = new Router({
    '/search': (service) => {
        const { query } = service;
        return Doom.$('div', {
            content: `Search for: ${query.q || 'everything'}`
        });
    }
});
```

### Router Slot System

The router-slot.js module provides a slot mechanism for rendering routed content within components.

#### Basic Usage

```javascript
import { routerSlot } from './router-slot.js';

const layout = await Doom.$('div', {
    header: {
        content: 'My Application',
        styleProps: { padding: '10px', backgroundColor: '#f0f0f0' }
    },
    main: {
        // This will be replaced by routed content
        content: 'Loading...'
    }
});

// Update the main content with routed component
routerSlot(layout, await currentRouteComponent());
```

#### Integration with Router

```javascript
// In your main application
Router.App({
    app: (service) => {
        const layout = Doom.$('div', {
            header: {
                content: 'My App',
                styleProps: { padding: '10px', backgroundColor: '#333', color: 'white' }
            },
            main: {
                content: 'Loading...'
            }
        });

        // Handle route changes
        const handleRoute = async (route) => {
            const component = await route(service);
            routerSlot(layout, component);
        };

        return layout;
    }
});
```

### Advanced Routing Features

#### 404 Handling

The router automatically provides a 404 page for unmatched routes:

```javascript
// Custom 404 page
const router = new Router({
    '/': (service) => homePage(service),
    // ... other routes
}, service);

// When no route matches, a default 404 page is shown
```

#### History Management

The router uses the browser's history API for navigation:

```javascript
// Navigation is handled automatically
// Browser back/forward buttons work correctly
// URLs are updated without page reloads
```

#### Route Parameters

```javascript
// Complex parameter handling
const router = new Router({
    '/user/:userId/post/:postId': (service) => {
        const { params, query } = service;
        
        return Doom.$('div', {
            content: `
                User: ${params.userId}
                Post: ${params.postId}
                Comments: ${query.comments || 'all'}
            `
        });
    }
});
```

### Best Practices

#### Route Organization

```javascript
// Organize routes by feature
const userRoutes = {
    '/user': (service) => userList(service),
    '/user/:id': (service) => userProfile(service),
    '/user/:id/edit': (service) => userEdit(service)
};

const productRoutes = {
    '/product': (service) => productList(service),
    '/product/:id': (service) => productDetail(service)
};

const router = new Router({
    ...userRoutes,
    ...productRoutes
}, service);
```

#### Service Injection

```javascript
// Use service for shared dependencies
const router = new Router(routes, {
    api: new ApiService(),
    auth: new AuthService(),
    config: {
        theme: 'dark',
        language: 'en'
    }
});
```

#### Error Handling

```javascript
// Handle route errors gracefully
const router = new Router({
    '/': (service) => {
        try {
            return homePage(service);
        } catch (error) {
            return Doom.$('div', {
                content: 'An error occurred',
                styleProps: { color: 'red' }
            });
        }
    }
});
```

### Integration Examples

#### Complete SPA Example

```javascript
// main.js
import { Router } from './router.js';
import { routerSlot } from './router-slot.js';

// Define routes
const routes = {
    '/': (service) => homePage(service),
    '/about': (service) => aboutPage(service),
    '/contact': (service) => contactPage(service)
};

// Create layout
const createLayout = () => {
    return Doom.$('div', {
        className: 'app',
        header: {
            content: 'My SPA App',
            styleProps: { padding: '10px', backgroundColor: '#333', color: 'white' }
        },
        navigation: {
            ul: {
                li: [
                    { content: 'Home', events: { click: () => navigate('/') } },
                    { content: 'About', events: { click: () => navigate('/about') } },
                    { content: 'Contact', events: { click: () => navigate('/contact') } }
                ]
            }
        },
        main: {
            content: 'Loading...'
        }
    });
};

// Initialize app
Router.App({
    app: (service) => {
        const layout = createLayout();
        
        // Handle navigation
        const navigate = (path) => {
            const component = routes[path](service);
            routerSlot(layout, component);
        };
        
        return layout;
    },
    service: {
        apiEndpoint: 'https://api.example.com'
    }
});
```

This routing system provides a complete solution for building single-page applications with clean URL structures, dynamic content loading, and efficient component management within the Cthulhu-Rlyeh architecture.

