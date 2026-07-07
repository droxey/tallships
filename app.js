/*
  Sail Boston 2026 static Leaflet map.
  No build step. No framework. Data is local and editable.
*/

const EVENT_DATES = [
  "2026-07-07",
  "2026-07-08",
  "2026-07-09",
  "2026-07-10",
  "2026-07-11",
  "2026-07-12",
  "2026-07-13",
  "2026-07-14",
  "2026-07-15",
  "2026-07-16"
];

const EVENTS = [
  {
    id: "voyagers-nyc-boston",
    title: "Voyagers Club Sail250 NYC → Boston Expedition",
    startDate: "2026-07-07",
    endDate: "2026-07-11",
    time: "Multi-day",
    type: "Expedition / private travel",
    reservation: "Required",
    reservationClass: "required",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3528,
    lng: -71.0409,
    notes: "Tracks tall ship movement toward Boston. Low practical value as a casual date unless booking the full expedition.",
    sources: [
      { label: "Voyagers Club expedition", url: "https://voyagersclub.org/expeditions/nyc-boston" }
    ]
  },
  {
    id: "aggregator-long-wharf",
    title: "Sail Into History: Tall Ships Return",
    startDate: "2026-07-07",
    endDate: "2026-07-09",
    time: "Varies",
    type: "Aggregator / cruise lead",
    reservation: "Recommended — verify inventory",
    reservationClass: "recommended",
    address: "Long Wharf, Boston, MA 02110",
    lat: 42.3602,
    lng: -71.0501,
    notes: "Treat as a lead, not a source of truth. Use it to check whether pre-parade cruise inventory exists.",
    sources: [
      { label: "Macaroni KID listing", url: "https://nashua.macaronikid.com/events/6a06b9fc7c64ad906baefe8f/%EF%B8%8Fsail-into-history-tall-ships-return-for-sail-boston-2026-%28sail250%29" }
    ]
  },
  {
    id: "mayflower-status",
    title: "Mayflower II Away From Plymouth / Boston Travel Window",
    startDate: "2026-07-08",
    endDate: "2026-07-17",
    time: "Multi-day",
    type: "Ship-status lead",
    reservation: "No attendee reservation found",
    reservationClass: "free",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3538,
    lng: -71.0474,
    notes: "Not an event by itself, but relevant because Mayflower II is part of the harbor activity.",
    sources: [
      { label: "See Plymouth Mayflower II note", url: "https://seeplymouth.com/event/mayflower-ii-and-tall-ships-250th-sail-celebration-plymouth-cape-cod-canal/" }
    ]
  },
  {
    id: "opening-ceremony",
    title: "Sail Boston Opening Ceremony",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "11:00 AM",
    type: "Official ceremony",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Boston Harbor Hotel Rotunda, 70 Rowes Wharf, Boston, MA 02110",
    lat: 42.3564,
    lng: -71.0503,
    notes: "Official opening marker before the public Parade of Sail day.",
    sources: [
      { label: "Meet Boston Sail Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" }
    ]
  },
  {
    id: "mayflower-welcome-sail",
    title: "Mayflower II Welcome Sail in Boston Harbor",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "10:30 AM–2:00 PM",
    type: "Premium ticketed sail",
    reservation: "Required — verify availability",
    reservationClass: "required",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3552,
    lng: -71.0489,
    notes: "High-price, high-access option. Use only if the historical angle matters more than Southie nostalgia.",
    sources: [
      { label: "Plimoth Patuxet Sail Boston events", url: "https://plimoth.org/events/sail-boston" }
    ]
  },
  {
    id: "nahant-wharf-party",
    title: "Nahant Wharf Tall Ships Viewing Party",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "3:00–9:00 PM",
    type: "Community party / viewing",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Nahant Wharf, Wharf Street, Nahant, MA 01908",
    lat: 42.4242,
    lng: -70.9149,
    notes: "Night-before community option with food, ice cream, photo ops, and live music while ships anchor off Nahant.",
    sources: [
      { label: "Town of Nahant event page", url: "https://nahant.org/sail-boston-tall-ships-2026/" }
    ]
  },
  {
    id: "liberty-fleet-sneak-peek",
    title: "Liberty Fleet Sneak Peek Sail",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "Varies",
    type: "Ticketed harbor sail",
    reservation: "Required",
    reservationClass: "required",
    address: "67 Long Wharf, Boston, MA 02110",
    lat: 42.3603,
    lng: -71.0497,
    notes: "Pre-Parade boat option to see ships at anchor before the Saturday crowds.",
    sources: [
      { label: "Liberty Fleet Boston250 sails", url: "https://libertyfleet.com/cruises/boston250/" }
    ]
  },
  {
    id: "cape-ann-anchorage-cruise",
    title: "Tall Ships Boston Cruise / Cape Ann Whale Watch Anchorage Excursion",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "Varies",
    type: "Ticketed cruise",
    reservation: "Required",
    reservationClass: "required",
    address: "Cape Ann Whale Watch, 415 Main Street, Gloucester, MA 01930",
    lat: 42.6111,
    lng: -70.6635,
    notes: "Listed as a July 10 excursion to see ships at anchor before the Parade of Sail.",
    sources: [
      { label: "Boston.com boat-viewing guide", url: "https://www.boston.com/things-to-do/events/2026/06/25/how-to-watch-the-parade-of-sail-by-boat/" }
    ]
  },
  {
    id: "spars-under-stars",
    title: "Mayflower II Spars Under the Stars",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "6:30–8:30 PM",
    type: "Premium evening event",
    reservation: "Required — verify availability",
    reservationClass: "required",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3547,
    lng: -71.0459,
    notes: "Romantic but pricey. Good if you want candlelit maritime history instead of crowds.",
    sources: [
      { label: "Plimoth Patuxet Sail Boston events", url: "https://plimoth.org/events/sail-boston" }
    ]
  },
  {
    id: "castle-island-parade",
    title: "Parade of Sail — Castle Island Public Viewing",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:00 AM–4:00 PM",
    type: "Main official event / public viewing",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Castle Island, 2010 Day Boulevard, Boston, MA 02127",
    lat: 42.3385,
    lng: -71.0124,
    notes: "Top nostalgia pick. Castle Island is an official public viewing area for the Parade of Sail.",
    sources: [
      { label: "Sail Boston Parade of Sail", url: "https://www.sailboston.com/parade-of-sail/" },
      { label: "Mass.gov Castle Island guidance", url: "https://www.mass.gov/info-details/sail-boston-2026-what-to-know-before-you-go-to-castle-island" },
      { label: "Sullivan's Castle Island Sail250 note", url: "https://www.sullivanscastleisland.com/sail-250/" }
    ]
  },
  {
    id: "sullivans-castle-island",
    title: "Sullivan's Castle Island Viewing Hub",
    startDate: "2026-07-11",
    endDate: "2026-07-16",
    time: "Restaurant hours vary",
    type: "Food / nostalgia stop",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Sullivan's Castle Island, 2080 William J Day Boulevard, Boston, MA 02127",
    lat: 42.3389,
    lng: -71.0105,
    notes: "Best low-friction add-on for Castle Island nostalgia: harbor, walk, old-school Southie feel, and food.",
    sources: [
      { label: "Sullivan's Castle Island Sail250", url: "https://www.sullivanscastleisland.com/sail-250/" }
    ]
  },
  {
    id: "parade-general-viewing",
    title: "Parade of Sail — Boston Harbor Viewing Zones",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:00 AM–4:00 PM",
    type: "Official public viewing",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Fan Pier Park, Boston, MA 02210",
    lat: 42.3535,
    lng: -71.0425,
    notes: "Alternate public viewing zones include Seaport, Downtown Waterfront, North End, Charlestown, and East Boston.",
    sources: [
      { label: "Sail Boston official events", url: "https://www.sailboston.com/events/" },
      { label: "Meet Boston viewing guide", url: "https://www.meetboston.com/sail-boston-2026/boston-tall-ships/" }
    ]
  },
  {
    id: "massmutual-grandstands",
    title: "MassMutual Sail Boston Grandstands at Fish Pier",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:00 AM–4:00 PM",
    type: "Reserved seating",
    reservation: "Required",
    reservationClass: "required",
    address: "Boston Fish Pier, 212 Northern Avenue, Boston, MA 02210",
    lat: 42.3488,
    lng: -71.0392,
    notes: "Best official controlled-seating fallback if Castle Island is too crowded.",
    sources: [
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "mayflower-parade-sail",
    title: "Parade of Sail Aboard Mayflower II",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "6:30 AM–1:00 PM",
    type: "Ultra-premium sail",
    reservation: "Required",
    reservationClass: "required",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3514,
    lng: -71.0484,
    notes: "Very high-access option. Not necessary if the real goal is Castle Island nostalgia.",
    sources: [
      { label: "Plimoth Patuxet Sail Boston events", url: "https://plimoth.org/events/sail-boston" }
    ]
  },
  {
    id: "city-cruises-parade",
    title: "Boston Harbor City Cruises Parade of Sail Cruise",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "6:30 AM boarding / 7:00 AM depart",
    type: "Ticketed cruise",
    reservation: "Required",
    reservationClass: "required",
    address: "Long Wharf, Boston, MA 02110",
    lat: 42.3600,
    lng: -71.0499,
    notes: "Paid controlled viewing from Long Wharf with narration and concessions/bar listed by Boston.com.",
    sources: [
      { label: "Boston.com boat-viewing guide", url: "https://www.boston.com/things-to-do/events/2026/06/25/how-to-watch-the-parade-of-sail-by-boat/" }
    ]
  },
  {
    id: "charles-river-boat-company",
    title: "Charles River Boat Company Parade of Sail Cruise",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "7:00 AM–4:00 PM",
    type: "Ticketed cruise",
    reservation: "Required",
    reservationClass: "required",
    address: "Rowes Wharf, Boston, MA 02110",
    lat: 42.3569,
    lng: -71.0501,
    notes: "Premium boat-viewing option from Rowes Wharf.",
    sources: [
      { label: "Boston.com boat-viewing guide", url: "https://www.boston.com/things-to-do/events/2026/06/25/how-to-watch-the-parade-of-sail-by-boat/" }
    ]
  },
  {
    id: "classic-harbor-line",
    title: "Classic Harbor Line Schooner Adirondack III Parade Sail",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "7:00 AM–4:00 PM",
    type: "Ticketed schooner sail",
    reservation: "Required",
    reservationClass: "required",
    address: "Rowes Wharf, Boston, MA 02110",
    lat: 42.3574,
    lng: -71.0495,
    notes: "Premium sailboat option with brunch/lunch/drinks listed by Boston.com.",
    sources: [
      { label: "Boston.com boat-viewing guide", url: "https://www.boston.com/things-to-do/events/2026/06/25/how-to-watch-the-parade-of-sail-by-boat/" }
    ]
  },
  {
    id: "sail-when-if",
    title: "Sail When and If / Harvey Gamage Parade Excursion",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "7:30 AM–4:00 PM",
    type: "Ticketed schooner sail",
    reservation: "Required",
    reservationClass: "required",
    address: "Charlestown Marina, 1 Pier 8, Charlestown, MA 02129",
    lat: 42.3747,
    lng: -71.0534,
    notes: "Good maritime-history angle from Charlestown Marina.",
    sources: [
      { label: "Boston.com boat-viewing guide", url: "https://www.boston.com/things-to-do/events/2026/06/25/how-to-watch-the-parade-of-sail-by-boat/" }
    ]
  },
  {
    id: "spectacle-island-viewing",
    title: "Spectacle Island Parade Viewing",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "8:00 AM–4:00 PM",
    type: "Island viewing / ferry",
    reservation: "Sold out / no day-of ticketing",
    reservationClass: "soldout",
    address: "Spectacle Island, Boston Harbor Islands, Boston, MA",
    lat: 42.3265,
    lng: -70.9841,
    notes: "Strong harbor-view location, but the island listing says sold out and no day-of ticketing.",
    sources: [
      { label: "Boston Harbor Islands listing", url: "https://www.bostonharborislands.org/event/sail-boston-2026-parade-of-sail-viewing-from-spectacle-island/" }
    ]
  },
  {
    id: "pier6-patio-party",
    title: "Pier 6 Tall Ship Parade Patio Party",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "8:00 AM–2:30 PM",
    type: "Party / restaurant viewing",
    reservation: "Required",
    reservationClass: "required",
    address: "Pier 6, 1 8th Street, Charlestown, MA 02129",
    lat: 42.3729,
    lng: -71.0550,
    notes: "Charlestown waterfront party. Strong paid backup if Castle Island feels too chaotic.",
    sources: [
      { label: "Boston Chefs event listing", url: "https://www.bostonchefs.com/events/tall-ship-parade-patio-party/" }
    ]
  },
  {
    id: "tall-ship-boston-vip",
    title: "The Tall Ship Boston VIP Viewing Experience",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "8:30 AM–2:30 PM",
    type: "Party / East Boston waterfront",
    reservation: "Required",
    reservationClass: "required",
    address: "The Tall Ship Boston, 1 East Pier Drive, East Boston, MA 02128",
    lat: 42.3642,
    lng: -71.0352,
    notes: "21+ ticketed viewing with harbor views. Good controlled-access backup.",
    sources: [
      { label: "Eventbrite listing", url: "https://www.eventbrite.com/e/tall-ship-boston-the-tall-ships-return-vip-viewing-experience-tickets-1993015315459" },
      { label: "Tall Ship Boston Facebook post", url: "https://www.facebook.com/TallShipBoston/posts/guess-were-not-the-only-tall-ship-in-the-harbor-next-weekend%EF%B8%8Fsail-boston-2026-is/1005702162217548/" }
    ]
  },
  {
    id: "hyatt-watch-party",
    title: "Hyatt Regency Boston Harbor Waterfront Watch Party",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:00 AM–4:00 PM",
    type: "Hotel party / watch party",
    reservation: "Required",
    reservationClass: "required",
    address: "Hyatt Regency Boston Harbor, 101 Harborside Drive, Boston, MA 02128",
    lat: 42.3591,
    lng: -71.0267,
    notes: "Harbor-view watch party with family activities, food/drinks, and 21+ areas listed in event snippets.",
    sources: [
      { label: "Eventbrite listing", url: "https://www.eventbrite.com/e/sail-boston-2026-waterfront-watch-party-at-hyatt-regency-boston-harbor-tickets-1992367499825" }
    ]
  },
  {
    id: "mastros-ocean-club",
    title: "Mastro's Ocean Club Boston Tall Ships Viewing Experience",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:00 AM–2:00 PM",
    type: "Restaurant event",
    reservation: "Required",
    reservationClass: "required",
    address: "Mastro's Ocean Club, 25 Fan Pier Boulevard, Boston, MA 02210",
    lat: 42.3537,
    lng: -71.0436,
    notes: "Food-forward Fan Pier viewing. Less nostalgic than Castle Island but useful for a polished fallback.",
    sources: [
      { label: "Eventbrite listing", url: "https://www.eventbrite.com/e/mastros-ocean-club-boston-tall-ships-viewing-experience-tickets-1990524065062" }
    ]
  },
  {
    id: "uss-constitution-museum",
    title: "USS Constitution Museum / Charlestown Navy Yard Programming",
    startDate: "2026-07-11",
    endDate: "2026-07-16",
    time: "9:00 AM–6:00 PM",
    type: "Museum / historic site",
    reservation: "No reservation found / donation suggested",
    reservationClass: "free",
    address: "USS Constitution Museum, Building 22, Charlestown Navy Yard, Charlestown, MA 02129",
    lat: 42.3725,
    lng: -71.0566,
    notes: "Historic add-on near the Navy Yard. Access may involve security screening or first-come rules depending on ship areas.",
    sources: [
      { label: "USS Constitution Museum visit page", url: "https://ussconstitutionmuseum.org/plan-your-visit/" },
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "sail-boston-festival",
    title: "Sail Boston Festival",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "10:00 AM–10:00 PM",
    type: "Official festival / beer garden / concessions",
    reservation: "No registration required",
    reservationClass: "free",
    address: "302 Northern Avenue, Boston, MA 02210",
    lat: 42.3485,
    lng: -71.0391,
    notes: "Free official festival with entertainment, concessions, merchandise, beer garden, and Ferris wheel.",
    sources: [
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" },
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" }
    ]
  },
  {
    id: "blue-hill-observatory",
    title: "Tall Ships and Chocolate Chips at Blue Hill Observatory",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "10:00 AM–5:00 PM",
    type: "Distant viewing / family activity",
    reservation: "Recommended — verify sign-up",
    reservationClass: "recommended",
    address: "Blue Hill Observatory, 1904 Canton Avenue, Milton, MA 02186",
    lat: 42.2143,
    lng: -71.1136,
    notes: "Quirky elevated-view lead. Better as backup than the main nostalgia date.",
    sources: [
      { label: "Eventbrite listing", url: "https://www.eventbrite.com/e/tall-ships-and-chocolate-chips-tickets-1992586702466" }
    ]
  },
  {
    id: "public-boarding",
    title: "Public Boarding of Ships",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Jul 11: 5:00–10:00 PM · Jul 12–15: 10:00 AM–10:00 PM",
    type: "Official ship boarding",
    reservation: "No reservation found / captain's discretion",
    reservationClass: "free",
    address: "Dockside berths around Boston Harbor, Boston, MA",
    lat: 42.3539,
    lng: -71.0452,
    notes: "Free public boarding, but each captain controls access. Expect lines, security, and ship-specific rules.",
    sources: [
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" },
      { label: "Boston Tea Party Ships event page", url: "https://www.bostonteapartyship.com/events-calendar/sail-boston-2026" }
    ]
  },
  {
    id: "rooftop-revere",
    title: "Toast to the Tall Ships at Rooftop@Revere",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "4:00 PM onward",
    type: "Rooftop party / pop-up",
    reservation: "Recommended — likely registration",
    reservationClass: "recommended",
    address: "Rooftop@Revere, 200 Stuart Street, Boston, MA 02116",
    lat: 42.3505,
    lng: -71.0663,
    notes: "Better for drinks after the Parade than ship nostalgia. Verify registration before showing up.",
    sources: [
      { label: "Eventbrite listing", url: "https://www.eventbrite.com/e/toast-to-the-tall-ships-at-rooftoprevere-tickets-1993029003400" }
    ]
  },
  {
    id: "fireworks-cruise-dj",
    title: "Mass Bay Lines Tall Ships Fireworks Cruise with DJ",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "8:00–10:00 PM",
    type: "Party cruise",
    reservation: "Required",
    reservationClass: "required",
    address: "Rowes Wharf, Boston, MA 02110",
    lat: 42.3563,
    lng: -71.0507,
    notes: "Ticketed fireworks cruise from Rowes Wharf. Useful night-cap if Fan Pier crowds are too much.",
    sources: [
      { label: "AllEvents listing", url: "https://allevents.in/boston/boston-250-tall-ships-fireworks-cruise-with-dj/100001992951851637" }
    ]
  },
  {
    id: "fan-pier-fireworks-july11",
    title: "Sail Boston Fireworks off Fan Pier",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:15 PM",
    type: "Official fireworks",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Fan Pier Park, Boston, MA 02210",
    lat: 42.3534,
    lng: -71.0431,
    notes: "Official fireworks from a barge off Fan Pier. Cinematic finish if you can handle Seaport crowds.",
    sources: [
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" },
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" }
    ]
  },
  {
    id: "street-parade",
    title: "Crew & Cadet Street Parade",
    startDate: "2026-07-13",
    endDate: "2026-07-13",
    time: "12:00–2:00 PM",
    type: "Official street parade",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Leader Bank Pavilion, 290 Northern Avenue, Boston, MA 02210",
    lat: 42.3489,
    lng: -71.0368,
    notes: "Route runs from Leader Bank Pavilion toward Christopher Columbus Park. Good daytime add-on after the big weekend.",
    sources: [
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" },
      { label: "Boston Tea Party Ships event page", url: "https://www.bostonteapartyship.com/events-calendar/sail-boston-2026" }
    ]
  },
  {
    id: "fan-pier-fireworks-july15",
    title: "Second Sail Boston Fireworks off Fan Pier",
    startDate: "2026-07-15",
    endDate: "2026-07-15",
    time: "9:15 PM",
    type: "Official fireworks",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Fan Pier Park, Boston, MA 02210",
    lat: 42.3527,
    lng: -71.0438,
    notes: "Second official fireworks night before departure day.",
    sources: [
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" },
      { label: "Boston Tea Party Ships event page", url: "https://www.bostonteapartyship.com/events-calendar/sail-boston-2026" }
    ]
  },
  {
    id: "departure-day",
    title: "Tall Ships Departure Day",
    startDate: "2026-07-16",
    endDate: "2026-07-16",
    time: "Timing TBD",
    type: "Departure / harbor viewing",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3518,
    lng: -71.0400,
    notes: "Ships depart Boston Harbor. Exact public viewing timing should be checked before attending.",
    sources: [
      { label: "Sail Boston home page", url: "https://www.sailboston.com/" },
      { label: "Axios Boston event overview", url: "https://www.axios.com/local/boston/2026/06/29/boston-harbor-tall-ships-visitors" }
    ]
  }
];

const BOSTON_HARBOR_CENTER = [42.3532, -71.0430];
const DEFAULT_ZOOM = 13;
const DATE_FILTER_ALL = "all";

const LEAFLET_CSS_URLS = [
  "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
];

const LEAFLET_JS_URLS = [
  "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

const TILE_PROVIDERS = [
  {
    name: "CARTO Voyager",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
  },
  {
    name: "CARTO Positron",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
  },
  {
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    subdomains: "abc",
    attribution: "&copy; OpenStreetMap contributors"
  }
];

const appShell = document.querySelector(".app-shell");
const dateFilter = document.querySelector("#date-filter");
const listTab = document.querySelector("#list-tab");
const mapTab = document.querySelector("#map-tab");
const listPanel = document.querySelector("#events-list-wrap");
const mapPanel = document.querySelector("#map-panel");
const tbody = document.querySelector("#events-tbody");
const listSummary = document.querySelector("#list-summary");
const sheet = document.querySelector("#event-sheet");
const sheetContent = document.querySelector("#sheet-content");
const sheetClose = document.querySelector("#sheet-close");
const mapHint = document.querySelector(".map-hint");

let map = null;
let markerLayer = null;
let activeEventId = null;
let activeMarker = null;
let currentTileLayer = null;
let currentTileProviderIndex = 0;
let currentTileErrorCount = 0;
let currentTileLoadCount = 0;
let repairTimer = null;
const markers = new Map();

function loadStylesheet(url) {
  return new Promise((resolve, reject) => {
    if ([...document.styleSheets].some((sheetItem) => sheetItem.href === url)) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed stylesheet: ${url}`));
    document.head.appendChild(link);
  });
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed script: ${url}`));
    document.head.appendChild(script);
  });
}

async function loadFirstWorking(urls, loader) {
  let lastError = null;
  for (const url of urls) {
    try {
      await loader(url);
      return url;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("No URL candidates supplied.");
}

async function ensureLeaflet() {
  if (window.L?.map) return;

  await Promise.all([
    loadFirstWorking(LEAFLET_CSS_URLS, loadStylesheet),
    loadFirstWorking(LEAFLET_JS_URLS, loadScript)
  ]);

  if (!window.L?.map) {
    throw new Error("Leaflet loaded but window.L.map is unavailable.");
  }
}

function setMapStatus(message) {
  if (mapHint) mapHint.textContent = message;
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(year, month - 1, day));
}

function dateRangeLabel(event) {
  if (event.startDate === event.endDate) return formatDate(event.startDate);
  return `${formatDate(event.startDate)}–${formatDate(event.endDate)}`;
}

function mapLink(address) {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function eventMatchesDate(event, selectedDate) {
  if (selectedDate === DATE_FILTER_ALL) return true;
  return event.startDate <= selectedDate && selectedDate <= event.endDate;
}

function startMinutes(time) {
  if (!time || /multi|varies|tbd|hours/i.test(time)) return 24 * 60;
  const match = time.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
  if (!match) return 24 * 60;

  let hours = Number(match[1]);
  const minutes = Number(match[2] || 0);
  const meridian = match[3]?.toUpperCase();

  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function currentEvents() {
  const selectedDate = dateFilter?.value || DATE_FILTER_ALL;
  return EVENTS
    .filter((event) => eventMatchesDate(event, selectedDate))
    .sort((a, b) => {
      const dateCompare = a.startDate.localeCompare(b.startDate);
      if (dateCompare !== 0) return dateCompare;
      const timeCompare = startMinutes(a.time) - startMinutes(b.time);
      if (timeCompare !== 0) return timeCompare;
      return a.title.localeCompare(b.title);
    });
}

function populateFilter() {
  if (!dateFilter) return;
  dateFilter.innerHTML = [
    `<option value="${DATE_FILTER_ALL}">All</option>`,
    ...EVENT_DATES.map((date) => `<option value="${date}">${formatDate(date)}</option>`)
  ].join("");
  dateFilter.value = DATE_FILTER_ALL;
}

function selectedDateIsAll() {
  return (dateFilter?.value || DATE_FILTER_ALL) === DATE_FILTER_ALL;
}

function createIcon(event, isActive = false) {
  const className = `sail-marker${isActive ? " is-active" : ""}`;
  return L.divIcon({
    className: "sail-marker-wrap",
    html: `<div class="${className}" aria-hidden="true"><span>⛵</span></div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 42]
  });
}

function resetMapToBostonHarbor() {
  if (!map) return;
  map.setView(BOSTON_HARBOR_CENTER, DEFAULT_ZOOM, { animate: false });
}

function fitVisibleEvents(events) {
  if (!map || !events.length) return;

  if (selectedDateIsAll()) {
    resetMapToBostonHarbor();
    return;
  }

  if (events.length === 1) {
    map.setView([events[0].lat, events[0].lng], Math.max(DEFAULT_ZOOM, 14), { animate: false });
    return;
  }

  const bounds = L.latLngBounds(events.map((event) => [event.lat, event.lng]));
  map.fitBounds(bounds.pad(0.18), { animate: false, maxZoom: 14 });
}

function renderMarkers() {
  if (!markerLayer || !map) return;

  markerLayer.clearLayers();
  markers.clear();

  const visible = currentEvents();
  visible.forEach((event) => {
    const marker = L.marker([event.lat, event.lng], {
      icon: createIcon(event, event.id === activeEventId),
      title: event.title,
      alt: event.title,
      keyboard: true,
      riseOnHover: true
    });

    marker.on("click", (leafletEvent) => {
      L.DomEvent.stopPropagation(leafletEvent);
      openEvent(event.id, { pan: true });
    });

    marker.on("keypress", (keyboardEvent) => {
      if (keyboardEvent.originalEvent.key === "Enter" || keyboardEvent.originalEvent.key === " ") {
        openEvent(event.id, { pan: true });
      }
    });

    marker.addTo(markerLayer);
    markers.set(event.id, marker);
  });

  fitVisibleEvents(visible);
  repairMapSoon("markers");
}

function renderList() {
  if (!tbody) return;

  const rows = currentEvents().map((event) => `
    <tr tabindex="0" data-event-id="${escapeHtml(event.id)}">
      <td>${escapeHtml(dateRangeLabel(event))}</td>
      <td>${escapeHtml(event.time)}</td>
      <td>
        <strong>${escapeHtml(event.title)}</strong>
        <span class="list-note">${escapeHtml(event.address)}</span>
      </td>
      <td>${escapeHtml(event.type)}</td>
      <td><span class="chip ${escapeHtml(event.reservationClass)}">${escapeHtml(event.reservation)}</span></td>
    </tr>
  `);

  tbody.innerHTML = rows.join("");
  const count = rows.length;
  const selectedDate = dateFilter?.value || DATE_FILTER_ALL;
  if (listSummary) {
    listSummary.textContent = selectedDate === DATE_FILTER_ALL
      ? `${count} known event${count === 1 ? "" : "s"} shown.`
      : `${count} event${count === 1 ? "" : "s"} on ${formatDate(selectedDate)}.`;
  }
}

function googleCalendarDate(dateString, fallbackTime = "09:00") {
  const [hour, minute] = fallbackTime.split(":").map(Number);
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, hour, minute, 0);
}

function parseCalendarDates(event) {
  const firstTime = event.time.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
  const secondTime = event.time.match(/[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  const fallbackStart = event.time.toLowerCase().includes("evening") ? "18:00" : "09:00";

  const convert = (match, fallback) => {
    if (!match) return fallback;
    let hours = Number(match[1]);
    const minutes = Number(match[2] || 0);
    const meridian = match[3]?.toUpperCase();
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const startClock = convert(firstTime, fallbackStart);
  const endClock = convert(secondTime, null);
  const start = googleCalendarDate(event.startDate, startClock);
  let end;

  if (endClock) {
    end = googleCalendarDate(event.startDate, endClock);
    if (end <= start) end.setDate(end.getDate() + 1);
  } else if (event.startDate !== event.endDate && /multi|hours|varies|tbd/i.test(event.time)) {
    end = googleCalendarDate(event.endDate, "17:00");
  } else {
    end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  }

  return { start, end };
}

function icsDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcs(value) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

function buildIcs(event) {
  const { start, end } = parseCalendarDates(event);
  const sourceLines = event.sources.map((source) => `${source.label}: ${source.url}`).join("\n");
  const description = [
    event.notes,
    `Type: ${event.type}`,
    `Reservation: ${event.reservation}`,
    `Open Maps: ${mapLink(event.address)}`,
    sourceLines ? `Sources:\n${sourceLines}` : ""
  ].filter(Boolean).join("\n\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Droxey//Tall Ships Boston//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@tallships.droxey.com`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `LOCATION:${escapeIcs(event.address)}`,
    `GEO:${event.lat};${event.lng}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `URL:${mapLink(event.address)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

function addToCalendar(event) {
  const ics = buildIcs(event);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.id}.ics`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function renderSheet(event) {
  const sources = event.sources.map((source) => `
    <li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>
  `).join("");

  sheetContent.innerHTML = `
    <div class="sheet-inner">
      <div class="kicker">
        <span class="chip">${escapeHtml(event.type)}</span>
        <span class="chip ${escapeHtml(event.reservationClass)}">${escapeHtml(event.reservation)}</span>
      </div>
      <h2 class="sheet-title">${escapeHtml(event.title)}</h2>
      <div class="meta-grid">
        <div class="meta-card">
          <b>Date</b>
          <span>${escapeHtml(dateRangeLabel(event))}</span>
        </div>
        <div class="meta-card">
          <b>Time</b>
          <span>${escapeHtml(event.time)}</span>
        </div>
        <div class="meta-card address-card">
          <b>Address</b>
          <address>${escapeHtml(event.address)}</address>
        </div>
      </div>
      <p class="notes">${escapeHtml(event.notes)}</p>
      <div class="sheet-actions-separator" aria-hidden="true"></div>
      <div class="actions">
        <a class="button button-primary" href="${escapeHtml(mapLink(event.address))}" target="_blank" rel="noopener noreferrer">Open Maps</a>
        <button id="share-event" class="button button-ghost" type="button">Share</button>
        <button id="calendar-event" class="button button-ghost button-wide" type="button">Add to Calendar</button>
      </div>
      <ul class="source-list" aria-label="Event source links">
        ${sources}
      </ul>
    </div>
  `;

  document.querySelector("#share-event")?.addEventListener("click", () => shareEvent(event));
  document.querySelector("#calendar-event")?.addEventListener("click", () => addToCalendar(event));
}

async function shareEvent(event) {
  const shareUrl = mapLink(event.address);
  const text = `${event.title}\n${dateRangeLabel(event)} · ${event.time}\n${event.address}\nReservation: ${event.reservation}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: event.title, text, url: shareUrl });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
    temporarySheetNotice("Copied event details.");
  } catch {
    temporarySheetNotice("Share unavailable. Open Maps and copy the link from there.");
  }
}

function temporarySheetNotice(message) {
  const notice = document.createElement("p");
  notice.className = "notes";
  notice.setAttribute("role", "status");
  notice.textContent = message;
  sheetContent.querySelector(".sheet-inner")?.appendChild(notice);
  window.setTimeout(() => notice.remove(), 2200);
}

function openEvent(eventId, options = {}) {
  const event = EVENTS.find((item) => item.id === eventId);
  if (!event) return;

  if (activeMarker) {
    const previousEvent = EVENTS.find((item) => item.id === activeEventId);
    if (previousEvent) activeMarker.setIcon(createIcon(previousEvent, false));
  }

  activeEventId = event.id;
  activeMarker = markers.get(event.id) || null;
  if (activeMarker) activeMarker.setIcon(createIcon(event, true));

  renderSheet(event);
  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");

  if (options.pan && appShell?.dataset.view === "map" && map) {
    map.panTo([event.lat, event.lng], { animate: true, duration: 0.22 });
    repairMapSoon("open-event");
  }
}

function closeSheet() {
  if (activeMarker) {
    const previousEvent = EVENTS.find((item) => item.id === activeEventId);
    if (previousEvent) activeMarker.setIcon(createIcon(previousEvent, false));
  }

  activeEventId = null;
  activeMarker = null;
  sheet.classList.remove("is-open");
  sheet.setAttribute("aria-hidden", "true");
}

function setActiveTab(view) {
  const isList = view === "list";
  listTab?.setAttribute("aria-selected", String(isList));
  mapTab?.setAttribute("aria-selected", String(!isList));
}

function setView(view) {
  const isList = view === "list";
  if (appShell) appShell.dataset.view = isList ? "list" : "map";
  if (listPanel) listPanel.hidden = !isList;
  if (mapPanel) mapPanel.hidden = isList;
  setActiveTab(isList ? "list" : "map");

  if (!isList) {
    repairMapNow("set-view-map");
    repairMapSoon("set-view-map");
  }
}

function refresh() {
  closeSheet();
  renderMarkers();
  renderList();
  if (appShell?.dataset.view === "map") repairMapSoon("refresh");
}

function installTileLayer(index = 0) {
  if (!map) return;
  currentTileProviderIndex = Math.min(index, TILE_PROVIDERS.length - 1);
  currentTileErrorCount = 0;
  currentTileLoadCount = 0;

  if (currentTileLayer) {
    map.removeLayer(currentTileLayer);
    currentTileLayer = null;
  }

  const provider = TILE_PROVIDERS[currentTileProviderIndex];
  currentTileLayer = L.tileLayer(provider.url, {
    attribution: provider.attribution,
    subdomains: provider.subdomains,
    maxZoom: 20,
    detectRetina: true,
    crossOrigin: true,
    updateWhenIdle: false,
    updateWhenZooming: false,
    keepBuffer: 4,
    errorTileUrl: errorTileDataUrl(provider.name)
  });

  currentTileLayer.on("tileload", () => {
    currentTileLoadCount += 1;
    if (currentTileLoadCount === 1) setMapStatus("Tap a sail marker. Tap the map to close details.");
  });

  currentTileLayer.on("tileerror", () => {
    currentTileErrorCount += 1;
    if (currentTileErrorCount >= 3 && currentTileProviderIndex < TILE_PROVIDERS.length - 1) {
      installTileLayer(currentTileProviderIndex + 1);
      repairMapSoon("tile-provider-fallback");
    } else if (currentTileProviderIndex === TILE_PROVIDERS.length - 1) {
      setMapStatus("Map tiles are unavailable. Event markers still work.");
    }
  });

  currentTileLayer.addTo(map);
  currentTileLayer.bringToBack();
  setMapStatus(`Loading map tiles: ${provider.name}`);
}

function errorTileDataUrl(label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="#dbe9ed"/>
      <path d="M0 210 C48 188 78 222 128 200 S208 188 256 212" fill="none" stroke="#aac7cf" stroke-width="12" opacity="0.85"/>
      <text x="128" y="124" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#0b2f3a">${escapeHtml(label)}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function repairMapNow(reason = "repair") {
  if (!map || appShell?.dataset.view === "list") return;
  const mapElement = document.querySelector("#map");
  if (!mapElement || mapElement.offsetWidth === 0 || mapElement.offsetHeight === 0) return;

  map.invalidateSize({ animate: false, pan: false });

  if (selectedDateIsAll()) {
    const center = map.getCenter();
    const drift = Math.abs(center.lat - BOSTON_HARBOR_CENTER[0]) + Math.abs(center.lng - BOSTON_HARBOR_CENTER[1]);
    if (drift > 0.12 || map.getZoom() < 10) resetMapToBostonHarbor();
  }
}

function repairMapSoon(reason = "repair") {
  window.clearTimeout(repairTimer);
  window.requestAnimationFrame(() => repairMapNow(reason));
  repairTimer = window.setTimeout(() => repairMapNow(`${reason}-late`), 140);
  window.setTimeout(() => repairMapNow(`${reason}-later`), 420);
  window.setTimeout(() => repairMapNow(`${reason}-final`), 900);
}

function initMap() {
  map = L.map("map", {
    center: BOSTON_HARBOR_CENTER,
    zoom: DEFAULT_ZOOM,
    minZoom: 10,
    maxZoom: 20,
    zoomControl: false,
    tap: true,
    preferCanvas: true,
    scrollWheelZoom: true,
    worldCopyJump: false
  });

  L.control.zoom({ position: "bottomright" }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
  installTileLayer(0);

  map.on("click", closeSheet);
  map.on("touchstart", closeSheet);
  map.whenReady(() => repairMapSoon("map-ready"));
}

function initEvents() {
  dateFilter?.addEventListener("change", refresh);
  listTab?.addEventListener("click", () => setView("list"));
  mapTab?.addEventListener("click", () => setView("map"));
  sheetClose?.addEventListener("click", closeSheet);

  sheet?.addEventListener("click", (event) => event.stopPropagation());
  sheet?.addEventListener("touchstart", (event) => event.stopPropagation(), { passive: true });

  tbody?.addEventListener("click", (event) => {
    const row = event.target.closest("tr[data-event-id]");
    if (!row) return;
    openEvent(row.dataset.eventId);
  });

  tbody?.addEventListener("keydown", (event) => {
    const row = event.target.closest("tr[data-event-id]");
    if (!row) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openEvent(row.dataset.eventId);
    }
  });

  window.addEventListener("resize", () => repairMapSoon("resize"), { passive: true });
  window.addEventListener("orientationchange", () => repairMapSoon("orientation"), { passive: true });
  window.addEventListener("pageshow", () => repairMapSoon("pageshow"), { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => repairMapSoon("visual-viewport-resize"), { passive: true });
    window.visualViewport.addEventListener("scroll", () => repairMapSoon("visual-viewport-scroll"), { passive: true });
  }

  const mapElement = document.querySelector("#map");
  if (window.ResizeObserver && mapElement) {
    new ResizeObserver(() => repairMapSoon("resize-observer")).observe(mapElement);
  }
}

async function boot() {
  try {
    setView("map");
    populateFilter();
    await ensureLeaflet();
    initMap();
    renderMarkers();
    renderList();
    initEvents();
    resetMapToBostonHarbor();
    repairMapSoon("boot");
  } catch (error) {
    console.error(error);
    setMapStatus("Map failed to load. Use the List tab for event details.");
    renderList();
  }
}

boot();
