________________________________________[Router-Notes]----------------------------

Why <Link> tag used in place of Anchor<a> tag.
Because, anchor tag refreshes the whole page.
Leads to recreting of whole DOM tree. which is avoided in React.js

// <Navlink> enables us to add styling in clickable links.
mainly Navlink used for color-highlighting.
Inside-details:
using IsActive, verifies through URL, that user is currently on the same page.
