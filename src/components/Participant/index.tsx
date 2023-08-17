import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";

type IParticipant = {
    name: string;
    onRemove: (name: string) => void
}

export function Participant(props: IParticipant) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{props.name}</Text>

            <TouchableOpacity style={styles.button} onPress={() => props.onRemove(props.name)}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
        </View>
    );
}