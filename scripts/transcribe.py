import io
import sys
import os
from pydub import AudioSegment

# Google Cloud client library import
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types

# Credentials for Google Translation API
credential_path = "CtrlF-b595d989508c.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

# Instantiates a client
client = speech.SpeechClient()

# The name of the audio file to transcribe
audio_file = sys.argv[1] # 'SchoolOfAI.wav'
file_to_mono = 'audio_mono.wav'
sound = AudioSegment.from_wav(audio_file)
sound = sound.set_channels(1) # convert audio file to mono
sound.export(file_to_mono, format="wav")

# Loads the audio into memory - for when not storing file on Google Cloud Storage
# with io.open(file_to_mono, 'rb') as audio_file:
#     content = audio_file.read()
# audio = types.RecognitionAudio(content=content)

# Loads the audio from Google Cloud Storage
audio = types.RecognitionAudio(uri='gs://ctrlfboilermake/'+audio_file)

config = types.RecognitionConfig(
    # encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
    # sample_rate_hertz=16000,
    language_code='en-US',
    enable_word_time_offsets=True,
    enable_automatic_punctuation=True)

# Detects speech in the audio file
# response = client.recognize(config, audio)
operation = client.long_running_recognize(config, audio)
result = operation.result(timeout=90)

transcript = ""
list_of_times = []
for result in result.results:
    alternative = result.alternatives[0]
    transcript += result.alternatives[0].transcript
    # print(u'Transcript: {}'.format(alternative.transcript))
    # print('Confidence: {}'.format(alternative.confidence))

    for word_info in alternative.words:
        # word = word_info.word
        start_time = word_info.start_time
        list_of_times.append(start_time.seconds)#+start_time.nanos*1e-9)
        #end_time = word_info.end_time
        # print('{} {}'.format(
        #         word,
        #         start_time.seconds + start_time.nanos * 1e-9,
        #         end_time.seconds + end_time.nanos * 1e-9))

# Transcript to file
outputFile = 'transcription.txt'
with open(outputFile, 'w', encoding='utf-8') as f:
    f.write(transcript)
f.close()

# Transcription to variable from file
filename = 'transcription.txt'
file = open(filename, 'r')
fulltext = file.read()
file.close()

# Retrieve starting time of each sentence
words_in_sent = 0
sentence_starts = [0]
for i in range(len(fulltext.split('.'))):
    words_in_sent += len(fulltext.split('.')[i].split())-1
    sentence_starts.append(list_of_times[words_in_sent])


for i in range(len(sentence_starts)-1):
    print(sentence_starts[i],fulltext.split('.')[i],'\n')

print(sentence_starts)
sys.stdout.flush()
