import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Bus, Train } from 'lucide-react';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        borderBottomStyle: 'dashed',
    },
    titleContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D4ED8',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 10,
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    iconContainer: {
        backgroundColor: '#EFF6FF',
        padding: 12,
        borderRadius: 50,
    },
    icon: {
        width: 30,
        height: 30,
        color: '#1D4ED8',
    },
    ticketContainer: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 20,
        marginBottom: 25,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#111827',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    col: {
        flexDirection: 'column',
        flex: 1,
    },
    label: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#6B7280',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    value: {
        fontSize: 12,
        color: '#111827',
        fontWeight: 'medium',
    },
    highlightValue: {
        fontSize: 16,
        color: '#1D4ED8',
        fontWeight: 'bold',
    },
    routeHeader: {
        backgroundColor: '#F8FAFC',
        padding: 15,
        borderRadius: 6,
        marginBottom: 15,
    },
    stations: {
        marginTop: 15,
    },
    station: {
        fontSize: 10,
        color: '#4B5563',
        marginBottom: 4,
        paddingLeft: 10,
        position: 'relative',
    },
    stationBullet: {
        position: 'absolute',
        left: 0,
        top: 4,
        width: 4,
        height: 4,
        backgroundColor: '#9CA3AF',
        borderRadius: 2,
    },
    footer: {
        marginTop: 30,
        fontSize: 9,
        color: '#9CA3AF',
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 15,
    },
    barcodeContainer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcode: {
        width: 200,
        height: 60,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    barcodeText: {
        fontSize: 8,
        color: '#6B7280',
        letterSpacing: 2,
    },
    ticketNumber: {
        position: 'absolute',
        top: 30,
        right: 30,
        fontSize: 10,
        color: '#6B7280',
    },
    watermark: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#E5E7EB',
        fontSize: 60,
        fontWeight: 'bold',
        opacity: 0.2,
        transform: 'rotate(-30deg)',
    },
});

const TicketPDF = ({ booking }: { booking: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Watermark */}
            <Text style={styles.watermark}>SEAT FINDER</Text>
            
            {/* Ticket Number */}
            <Text style={styles.ticketNumber}>Ticket #: {booking.ticketNumber || Math.random().toString(36).substring(2, 10).toUpperCase()}</Text>
            
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Booking Confirmation</Text>
                    <Text style={styles.subtitle}>Seat Finder Travel Ticket</Text>
                </View>
                <View style={styles.iconContainer}>
                    {booking.type === 'bus' ? (
                        <Bus style={styles.icon} />
                    ) : (
                        <Train style={styles.icon} />
                    )}
                </View>
            </View>

            {/* Main Ticket */}
            <View style={styles.ticketContainer}>
                {/* Journey Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Journey Information</Text>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Service Name</Text>
                            <Text style={styles.value}>{booking.name}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Travel Type</Text>
                            <Text style={styles.value}>{booking.type.toUpperCase()}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Departure Time</Text>
                            <Text style={styles.value}>{booking.time}</Text>
                        </View>
                    </View>
                </View>

                {/* Route Highlights */}
                <View style={styles.routeHeader}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.label}>From</Text>
                            <Text style={styles.highlightValue}>{booking.from}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>To</Text>
                            <Text style={styles.highlightValue}>{booking.to}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Total Fare</Text>
                            <Text style={styles.highlightValue}>₹{booking.fare}</Text>
                        </View>
                    </View>
                </View>

                {/* Route Stations */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Route Stations</Text>
                    <View style={styles.stations}>
                        {booking.stations.map((station: string, index: number) => (
                            <Text key={index} style={styles.station}>
                                <View style={styles.stationBullet} />
                                {station}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* Passenger Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Passenger Details</Text>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Passenger Name</Text>
                            <Text style={styles.value}>{booking.passengerName || 'Not provided'}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Number of Passengers</Text>
                            <Text style={styles.value}>{booking.passengerCount || 1}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Booking Date</Text>
                            <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Barcode */}
            <View style={styles.barcodeContainer}>
                <View style={styles.barcode}>
                    <Text style={styles.barcodeText}>
                        {Math.random().toString(36).substring(2, 18).toUpperCase()}
                    </Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>This is an auto-generated ticket. Please carry a valid ID proof.</Text>
                <Text>For any queries, contact support@seatfinder.com | Phone: +1 234 567 890</Text>
                <Text>Ticket generated on {new Date().toLocaleString()}</Text>
            </View>
        </Page>
    </Document>
);

export default TicketPDF;