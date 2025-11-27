import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { checkList } from '@/src/data/checklist';
import { FONT_SIZES } from '@/constants/theme';

export default function FullChecklist() {
  const getProgress = (chapter: any) => {
    const totalItems = chapter.sections.reduce((sum: number, sec: any) => sum + sec.items.length, 0);
    const doneItems = chapter.sections.reduce((sum: number, sec: any) =>
      sum + sec.items.filter((item: any) => item.done).length, 0
    );
    const percent = Math.round((doneItems / totalItems) * 100);
    return { doneItems, totalItems, percent };
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Validação Completa</Text>

      {checkList.map((chapter, index) => {
        const { percent } = getProgress(chapter);

        return (
          <View key={index} style={styles.chapterContainer}>
            <View style={styles.chapterHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.chapterTitle}>{String(chapter.title || 'Sem título')}</Text>
              </View>
              <Text style={styles.progressText}>{percent}%</Text>
            </View>

            {chapter.sections.map((section, secIdx) => (
              <View key={secIdx} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{String(section.title || 'Sem seção')}</Text>
                {section.items.map((item, itemIdx) => (
                  <View key={itemIdx} style={styles.itemRow}>
                    <Ionicons
                      name={item.done ? 'checkmark-circle' : 'ellipse-outline'}
                      size={18}
                      color={item.done ? 'green' : 'gray'}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.itemText}>{String(item.title || 'Sem item')}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  pageTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chapterContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 12,
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  chapterTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: '#666',
  },
  sectionContainer: {
    marginTop: 10,
    paddingLeft: 24,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    marginBottom: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemText: {
    fontSize: FONT_SIZES.small,
    flex: 1,
  },
});