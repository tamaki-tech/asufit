import { Hono } from 'hono';

// sample routes
const bookRoute = new Hono()
	.get('/', (c) => c.json({ result: 'list books' }))
	.post('/', (c) => c.json({ result: 'create a book' }, 201))
	.get('/:id', (c) => c.json({ result: `get ${c.req.param('id')}` }));

// main app
export const app = new Hono()
	.route('/book', bookRoute);

export type ApiRoute = typeof app;
