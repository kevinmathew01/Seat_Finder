import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Bus, Train } from 'lucide-react';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#3B82F6',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E40AF',
    },
    logo: {
        width: 80,
        height: 80,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1E40AF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6B7280',
    },
    value: {
        fontSize: 12,
        color: '#111827',
    },
    route: {
        backgroundColor: '#EFF6FF',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    stations: {
        marginTop: 10,
    },
    station: {
        fontSize: 10,
        color: '#4B5563',
        marginBottom: 4,
    },
    footer: {
        marginTop: 30,
        fontSize: 10,
        color: '#9CA3AF',
        textAlign: 'center',
    },
    barcode: {
        width: 150,
        height: 50,
        alignSelf: 'center',
        marginTop: 20,
    },
});

const TicketPDF = ({ booking }: { booking: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Seat Finder Ticket</Text>
                <View>
                    {booking.type === 'bus' ? (
                        <Bus style={styles.logo} />
                    ) : (
                        <Train style={styles.logo} />
                    )}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Journey Details</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Service:</Text>
                    <Text style={styles.value}>{booking.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Type:</Text>
                    <Text style={styles.value}>{booking.type.toUpperCase()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Departure Time:</Text>
                    <Text style={styles.value}>{booking.time}</Text>
                </View>
            </View>

            <View style={styles.route}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>From</Text>
                        <Text style={[styles.value, { fontSize: 16 }]}>{booking.from}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>To</Text>
                        <Text style={[styles.value, { fontSize: 16 }]}>{booking.to}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Fare</Text>
                        <Text style={[styles.value, { fontSize: 16 }]}>₹{booking.fare}</Text>
                    </View>
                </View>

                <View style={styles.stations}>
                    <Text style={styles.label}>Route Stations:</Text>
                    {booking.stations.map((station: string, index: number) => (
                        <Text key={index} style={styles.station}>
                            {index + 1}. {station}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Passenger Details</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{booking.passengerName || 'Not provided'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Passengers:</Text>
                    <Text style={styles.value}>{booking.passengerCount || 1}</Text>
                </View>
            </View>

            <View style={styles.barcode}>
                {/* In a real app, you would generate a barcode here */}
                <Text style={{ textAlign: 'center' }}>BARCODE PLACEHOLDER</Text>
            </View>

            <View style={styles.footer}>
                <Text>Thank you for using Seat Finder!</Text>
                <Text>For any queries, contact support@seatfinder.com</Text>
                <Text>Ticket generated on {new Date().toLocaleString()}</Text>
            </View>
        </Page>
    </Document>
);

export default TicketPDF;