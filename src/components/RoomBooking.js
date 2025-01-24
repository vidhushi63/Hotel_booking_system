import React, { useState } from "react";

const generateRandomOccupancy = (availableRooms) => {
    const updatedRooms = { ...availableRooms };
    Object.keys(updatedRooms).forEach((floor) => {
        const rooms = updatedRooms[floor];
        const occupiedCount = Math.floor(Math.random() * rooms.length);
        updatedRooms[floor] = rooms.slice(occupiedCount);
    });
    return updatedRooms;
};

const initialRooms = {
    1: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    2: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210],
    3: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310],
    4: [401, 402, 403, 404, 405, 406, 407, 408, 409, 410],
    5: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510],
    6: [601, 602, 603, 604, 605, 606, 607, 608, 609, 610],
    7: [701, 702, 703, 704, 705, 706, 707, 708, 709, 710],
    8: [801, 802, 803, 804, 805, 806, 807, 808, 809, 810],
    9: [901, 902, 903, 904, 905, 906, 907, 908, 909, 910],
    10: [1001, 1002, 1003, 1004, 1005, 1006, 1007],
};

const RoomBooking = () => {
    const [availableRooms, setAvailableRooms] = useState({ ...initialRooms });
    const [numRooms, setNumRooms] = useState(1);
    const [bookingResult, setBookingResult] = useState(null);

    const handleBookRooms = () => {
        const booking = calculateBooking(numRooms);
        setBookingResult(booking);
        updateAvailableRooms(booking.rooms);
    };

    const calculateBooking = (numRooms) => {
        let bookedRooms = [];
        let floorsUsed = [];
    
        for (let floor in availableRooms) {
            
            if (bookedRooms.length >= numRooms) break;
            const floorRooms = availableRooms[floor];
            if (floorRooms.length > 0) {
                const needed = numRooms - bookedRooms.length;
                const selectedRooms = floorRooms.slice(0, needed);
                bookedRooms = [...bookedRooms, ...selectedRooms];
                floorsUsed.push(parseInt(floor));
            }
        }
    
        const roomPositions = bookedRooms.map((room) => room % 100);
        const horizontalTime =
            roomPositions.length > 1? Math.max(...roomPositions) - Math.min(...roomPositions): 0;
    
        const verticalTime =
            floorsUsed.length > 1? (Math.max(...floorsUsed) - Math.min(...floorsUsed)) * 2: 0;
    
        return {
            rooms: bookedRooms,
            travelTime: horizontalTime + verticalTime,
        };
    };
    

    const updateAvailableRooms = (bookedRooms) => {
        const updatedRooms = { ...availableRooms };
        for (let room of bookedRooms) {
            const floor = Math.floor(room / 100);
            updatedRooms[floor] = updatedRooms[floor].filter((r) => r !== room);
        }
        setAvailableRooms(updatedRooms);
    };

    const handleRandomOccupancy = () => {
        const randomizedRooms = generateRandomOccupancy(initialRooms);
        setAvailableRooms(randomizedRooms);
        setBookingResult(null);
    };

    const handleReset = () => {
        setAvailableRooms({ ...initialRooms });
        setBookingResult(null);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Hotel Room Reservation System</h1>

            <div className="row mb-4">
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="numRooms" className="form-label">
                        Enter Number of Rooms to Book:
                    </label>
                    <input
                        type="number"
                        id="numRooms"
                        className="form-control"
                        value={numRooms}
                        min="1"
                        max="5"
                        onChange={(e) => setNumRooms(parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col text-center">
                    <button onClick={handleBookRooms} className="btn btn-primary me-2">
                        Book Rooms
                    </button>
                    <button onClick={handleRandomOccupancy} className="btn btn-warning me-2">
                        Generate Random Occupancy
                    </button>
                    <button onClick={handleReset} className="btn btn-danger">
                        Reset Booking
                    </button>
                </div>
            </div>

            {bookingResult && (
                <div className="row mb-4">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Booking Details</h5>
                                <p className="card-text">
                                    <strong>Rooms Booked:</strong> {bookingResult.rooms.join(", ")}
                                </p>
                                <p className="card-text">
                                    <strong>Total Travel Time:</strong> {bookingResult.travelTime} minutes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row">
                <h2 className="text-center mb-3">Available Rooms</h2>
                {Object.keys(availableRooms).map((floor) => (
                    <div className="col-12 mb-4" key={floor}>
                        <h5 className="text-center">Floor {floor}</h5>
                        <div className="d-flex flex-wrap justify-content-center">
                            {initialRooms[floor].map((room) => (
                                <div
                                    key={room}
                                    className={`room-box ${availableRooms[floor].includes(room) ? "available" : "occupied"
                                        }`}
                                >
                                    {room}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default RoomBooking;
