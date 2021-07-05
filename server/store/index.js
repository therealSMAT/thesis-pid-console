const routes = [
    {
        tripId: 'A',
        time: '19:17',
        location_name: 'Vabaduse Valjak',
    },
    {
        tripId: 'B',
        time: '19:15',
        location_name: 'Tonismagi',
    },
    {
        tripId: 'C',
        time: '19:14',
        location_name: 'Koidu',
    },
    {
        tripId: 'D',
        time: '19:10',
        location_name: 'Taksopark',
    },
    {
        tripId: 'E',
        time: '19:07',
        location_name: 'Koskla',
    },
    {
        tripId: 'F',
        time: '19:04',
        location_name: 'Tedre',
    },
    {
        tripId: 'G',
        time: '19:00',
        location_name: 'Linnu Tee',
    },
    {
        tripId: 'H',
        time: '18:58',
        location_name: 'Siili',
    },
    {
        tripId: 'I',
        time: '18:55',
        location_name: 'Lepistiku',
    },
    {
        tripId: 'J',
        time: '18:52',
        location_name: 'Lehola',
    },
    {
        tripId: 'K',
        time: '18:49',
        location_name: 'Szolnok',
    },
    {
        tripId: 'L',
        time: '18:47',
        location_name: 'Kaja',
    },
    {
        tripId: 'M',
        time: '18:43',
        location_name: 'Akadeemia tee',
    }
]

exports.routes = () => {
    return {
        _id: String.fromCharCode(97 + Math.floor(Math.random() * 26)),
        data: routes
    };
}
