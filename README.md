# Team Xerbutri

The proof of concept for the new Team Xerbutri website.

Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the
pictures.

## Technicalities

As can be read in the documentation, the website gets its data by reading json files. So we need a local server to serve
these up for us, because the browser won't do this for us.

## Getting started

Go to the terminal.  
Type: "npm run dev"  
It will start up a localhost and serve the files.

## Testing preview

Type: "vite build"
When building is ready, type: "npm run preview"

## Style guide

There are:  
- Floating action buttons
- Menu
- Nav-buttons
- Cards

Less is more, and keep it simple.

Principles:
- Hovering makes the button lighter, with a shadow around it, making it hover. The tile-cards increase picture size, making it move toward the cursor.
- Clicking/Active makes it darker, with a shadow and insert, to give the feeling of depth. Pushing away.
- Focus makes it even lighter, with a focus shadow ring as border, or a focus ring outline when keyboard is used.

Basic colors to use are from the color palette:
- #18121e range for the background
- #233237 gunmetal for fab and menu
- #EAC67A yasmine for warmth (text, icons, detailing)
- rust brown for warmth in detailing
