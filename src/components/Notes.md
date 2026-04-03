________________________________________[Router-Notes]----------------------------

Why <Link> tag used in place of Anchor<a> tag.
Because, anchor tag refreshes the whole page.
Leads to recreting of whole DOM tree. which is avoided in React.js

// <Navlink> enables us to add styling in clickable links.
mainly Navlink used for color-highlighting.
Inside-details:
using IsActive, verifies through URL, that user is currently on the same page.
------------------------------------------------------------
# Layout.jsx:(why):
Optimization and resuability of layout.
Stopping import Header and footer in Home, Testimonials.
to avoid this , we have used outlet, to make Header and Footer fixed for every navigation

# why React-router?
 The problem is that without a router, the URL never changes — you can't bookmark a page, share a link, or use the browser's back/forward buttons. [React Router solves this by syncing your component tree to the URL.]

 <create-Browser-Router:>
 createBrowserRouter is the modern API (v6.4+) that also unlocks data loading features like loaders and actions, which are useful if you scale the app further.
-----------------------------------------------------
# USE OF CONTEXT-API
<Usercontext.js>
<why we have used usercontext.js file not jsx?>
Both .js and .jsx work identically in your setup because Vite (your bundler) handles both extensions the same way — it compiles JSX syntax regardless of the file extension.

The reason .js is fine here specifically:
[Why-children as a prop?]:
---------------------------------<A-New-chapter to manage-Front-end>
[Next.js]:
