import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";


export default function Home() {

  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    if (participantName) {
      if (participants.includes(participantName)) {
        return Alert.alert("Já existe um participante na lista com este nome.");
      }

      setParticipants(prevState => [...prevState, participantName]);
      setParticipantName('');

    }
  }

  function handleParticipantRemove(name: string) {
    if (participants.includes(name)) {
      Alert.alert("Remover", `Remover o participante ${name}?`, [
        {
          text: 'Sim',
          onPress: () => {

            setParticipants(prevState => prevState.filter(participant => participant !== name));

          }
        },
        {
          text: 'Não',
          style: "cancel"
        }
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do Evento
      </Text>
      <Text style={styles.eventDate}>
        Sexta-feira, 18 de Agosto de 2023
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={setParticipantName}
          placeholder="Nome do participante"
          placeholderTextColor="#fff"
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleParticipantAdd()}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={handleParticipantRemove} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.listEmptyText}>
            Lista de participantes vazia. Adicione participantes ao seu evento.
          </Text>
        }
      />

    </View>
  );
}
