// ##############################
// // // Tasks for TasksCard - see Dashboard view
// #############################

var bugs = [
    'Sign contract for "What are conference organizers afraid of?"',
    "Lines From Great Russian Literature? Or E-mails From My Boss?",
    "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    "Create 4 Invisible User Experiences you Never Knew About"
];
var website = [
    "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    'Sign contract for "What are conference organizers afraid of?"'
];
var server = [
    "Lines From Great Russian Literature? Or E-mails From My Boss?",
    "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    'Sign contract for "What are conference organizers afraid of?"'
];

let residences = [
    {
        _id: "5c8026f9dd2745212057540e",
        type: {
            _id: "5c7f2393dd27450ffc4bcbea",
            type: "Apartment"
        },
        name: "Casa em Itapeva",
        address: {
            postal_code: {
                _id: "5c7f1ed8dd27453334c151b5",
                postal_code: "18405060",
                city: "Itapeva",
                province: "São Paulo",
                country: "Brazil"
            },
            district: "Jardim Ferrari",
            street: "7 de Setembro",
            number: 176
        },
        icon: "home"
    },
    {
        _id: "5c899fbfdd274507687ee730",
        type: {
            _id: "5c7f2393dd27450ffc4bcbea",
            type: "Apartment"
        },
        name: "Casa em Itapeva",
        address: {
            postal_code: {
                _id: "5c86fc32dd274504dc012610",
                postal_code: "84026000",
                city: "Ponta Grossa",
                province: "Paraná",
                country: "Brazil"
            },
            district: "Uvaranas",
            street: "Ana Rita",
            number: 296,
            complement: "Apartamento 21"
        },
        icon: "home"
    }
];

module.exports = {
    // these 3 are used to create the tasks lists in TasksCard - Dashboard view
    bugs,
    website,
    server,
    residences
};
