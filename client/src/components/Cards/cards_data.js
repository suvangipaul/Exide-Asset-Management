import data from "../../view/Desktop/mock_data.json";
console.log(data.length)
export const cards_data = [{
        "name": "Desktops",
        "number": data.length,
        "url": "/monitor"
    },
    {
        "name": "Laptops",
        "url": "/cpu"
    },
    {
        "name": "Servers",
        "url": "/laptop"
    },
    {
        "name": "Printers",
        "url": "/printer"
    },
    {
        "name": "N/W Switches",
        "url": "/server"
    },

]
console.log(cards_data);