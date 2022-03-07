import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AutocompletePredictions, SuggestionsListProps } from "../types/interfaces";
const SuggestionsList = ({ data, onSelect }: SuggestionsListProps) => {
  return (
    <List spacing={3}>
      {data &&
        data.map((suggestion: AutocompletePredictions) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
          return (
            <ListItem
              cursor="pointer"
              key={place_id}
              onClick={() => {
                onSelect(suggestion);
              }}
            >
              <ListIcon as={FaMapMarkerAlt} color="brand.200" />
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </ListItem>
          );
        })}
    </List>
  );
};

export default SuggestionsList;
