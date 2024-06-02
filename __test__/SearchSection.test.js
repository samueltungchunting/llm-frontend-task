// __tests__/SearchPlaceSection.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocationInput from '../src/app/components/LocationInput';
import SearchPlaceSection from '@/app/components/SearchPlaceSection';
import { DestinationContext } from '@/context/Destination';
import { SourceContext } from '@/context/SourceContext';
import { LoadScript } from "@react-google-maps/api";

// Mock GooglePlacesAutocomplete to prevent actual API calls during testing
// const MockGooglePlacesAutocomplete = (props) => {
//     return <input data-testid="autocomplete" onChange={(e) => props.selectProps.onChange({ label: e.target.value })} />;
// };
// MockGooglePlacesAutocomplete.displayName = 'MockGooglePlacesAutocomplete';

// jest.mock('react-google-places-autocomplete', () => MockGooglePlacesAutocomplete);

// describe('LocationInput Component', () => {
//     it('renders correctly', () => {
//         const { getByTestId } = render(
//             <LoadScript
//                 googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}
//                 libraries={["places"]}
//             >
//                 <LocationInput type="source" value={null} setValue={jest.fn()} />
//             </LoadScript>
//         );

//         const autocompleteInput = getByTestId('autocomplete');
//         expect(autocompleteInput).toBeInTheDocument();
//     });

    // it('calls setValue on change', () => {
    //     const setValue = jest.fn();
    //     const { getByTestId } = render(
    //         <LocationInput type="source" value={null} setValue={setValue} />
    //     );

    //     const autocompleteInput = getByTestId('autocomplete');
    //     fireEvent.change(autocompleteInput, { target: { value: 'New York' } });

    //     expect(setValue).toHaveBeenCalledWith({ label: 'New York' });
    // });
// });

// describe('SearchPlaceSection Component', () => {
//     const sourceContextValue = { source: null, setSource: jest.fn() };
//     const destinationContextValue = { destination: null, setDestination: jest.fn() };

//     it('renders correctly', () => {
//         render(
//             <SourceContext.Provider value={sourceContextValue}>
//                 <DestinationContext.Provider value={destinationContextValue}>
//                     <SearchPlaceSection />
//                 </DestinationContext.Provider>
//             </SourceContext.Provider>
//         );

//         expect(screen.getByText('Starting location')).toBeInTheDocument();
//         expect(screen.getByText('Drop-off point')).toBeInTheDocument();
//     });

//     it('shows error when submitting without source or destination', () => {
//         render(
//             <SourceContext.Provider value={sourceContextValue}>
//                 <DestinationContext.Provider value={destinationContextValue}>
//                     <SearchPlaceSection />
//                 </DestinationContext.Provider>
//             </SourceContext.Provider>
//         );

//         fireEvent.click(screen.getByText('Submit'));

//         expect(screen.getByText('Please provide both pickup and drop-off addresses.')).toBeInTheDocument();
//     });

//     it('calls fetchData on submit with valid source and destination', async () => {
//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () => Promise.resolve({ token: 'mock-token' }),
//             })
//         );

//         const mockSourceContextValue = { source: 'mock-source', setSource: jest.fn() };
//         const mockDestinationContextValue = { destination: 'mock-destination', setDestination: jest.fn() };

//         render(
//             <SourceContext.Provider value={mockSourceContextValue}>
//                 <DestinationContext.Provider value={mockDestinationContextValue}>
//                     <SearchPlaceSection />
//                 </DestinationContext.Provider>
//             </SourceContext.Provider>
//         );

//         fireEvent.click(screen.getByText('Submit'));

//         expect(global.fetch).toHaveBeenCalledWith('https://sg-mock-api.lalamove.com/route', expect.any(Object));

//         // Clean up mock
//         global.fetch.mockClear();
//     });
// });
